'use strict';
const User = require('../model');
const Joi = require('joi');
const Boom = require('boom');

const Helpers = require('../core/helpers');

exports.post = {
	handler: handleRequest,
	auth: false,
	validate: {
		payload: {
			email: Joi.string().email(),
			displayName: Joi.string().min(3).max(40),
			password: Joi.string().min(3).max(20)
		}
	}
};

function handleRequest(request, reply) {
	User
		.findOne({ email: request.payload.email }).exec()
		.then(registerUser)
		.then(replyWithToken)
		.catch(reportError);

	function registerUser (user) {
		if (user) return Promise.reject(Boom.conflict('Email is already taken'));

		user = new User({
			displayName: request.payload.displayName,
			email: request.payload.email,
			password: request.payload.password
		});

		return user.save();
	}

	function replyWithToken (user) {
		//const secret = request.server.registrations.user.options.auth.token.secret;
		const secret = reply.realm.pluginOptions.auth.token.secret;
		reply({
			token: Helpers.createJWT(user, secret)
		});
	}

	function reportError (error) {
		if (error.isBoom) return reply(error);
		return reply(Boom.badImplementation(error.message));
	}
}