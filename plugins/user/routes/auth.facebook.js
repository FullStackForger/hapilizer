'use strict';
const User = require('../model');
const Joi = require('joi');
const Boom = require('boom');
const Hoek = require('hoek');
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
			return {
				token: Hoek.clone(response.data)
			};
		});
};

internal.retrieveUserProfile = function (data) {
	return Axios
		.get(graphApiUrl, { params: { access_token: data.token.access_token } })
		.then((response) => {
			data.profile = Hoek.clone(response.data);
			return data;
		});
};

internal.authenticateUser = function (data) {
	return User
		.findOne( { $or: [
			{ 'facebook.id': data.profile.id },
			{ email: data.profile.email }
		]})
		.then((user) => {
			if (!user) user = new User();

			user.facebook = data.profile;
			user.facebook.picture =  pictureUrl.replace('{{profileId}}', data.profile.id);
			user.facebook.token = data.token;

			user.email = user.email || data.profile.email;
			user.picture = user.picture || user.facebook.picture;
			user.displayName = user.displayName || data.profile.name;
			return user.save();
		})
};