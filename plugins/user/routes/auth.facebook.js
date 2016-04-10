'use strict';
const User = require('../model');
const Joi = require('joi');
const Boom = require('boom');
const Axios = require('axios');

const Helpers = require('../core/helpers');
const internal = {};

const fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
const graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
const pictureUrl = 'https://graph.facebook.com/v2.3/{{profileId}}/picture?type=large';

exports.post = {
	auth: false,
	validate: {
		payload: {
			code: Joi.string().required(),
			clientId: Joi.string().required(),
			redirectUri: Joi.string().required()
		}
	},
	handler: function (request, reply) {
		const config = reply.realm.pluginOptions;
		const codeSwapParams = {
			code: request.payload.code,
			client_id: request.payload.clientId,
			client_secret: config.providers.facebook.secret,
			redirect_uri: request.payload.redirectUri
		};

		Promise.resolve(codeSwapParams)
			.then(internal.swapAccessCodeForToken)
			.then(internal.parseAndStoreAccessToken)
			.then(internal.retrieveUserProfile)
			.then(internal.authenticateUser)
			.then((user) => {
				const secret = config.token.secret;
				reply({ access_token: Helpers.createJWT(user, secret) });
			})
			.catch((err) => {
				reply(Boom.badImplementation('Server failed to authenticate', err));
			})
	}
};

internal.swapAccessCodeForToken = function (swapParams) {
	return Axios
		.get(accessTokenUrl, { params: swapParams })
		.then((response) => {
			return response.data;
		});
};

internal.parseAndStoreAccessToken = function (response) {
	// todo: store access token in db
	//response.expires_in;
	//response.access_token;
	return response.access_token;
};

internal.retrieveUserProfile = function (accessToken) {
	return Axios
		.get(graphApiUrl, { params: { access_token: accessToken } })
		.then((response) => {
			return response.data;
		});
};

internal.authenticateUser = function (fbProfile) {
	return User
		.findOne( { $or: [
			{ facebook: fbProfile.id },
			{ email: fbProfile.email }
		]})
		.then((user) => {
			if (!user) user = new User();
			user.facebook = fbProfile.id;
			user.email = user.email || fbProfile.email;
			user.picture = user.picture || pictureUrl.replace('{{profileId}}', fbProfile.id);
			user.displayName = user.displayName || fbProfile.name;
			return user.save();
		})
};