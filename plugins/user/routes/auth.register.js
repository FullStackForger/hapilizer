'use strict';
const User = require('../model');
const Joi = require('joi');

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

	const registerUser = function (user) {
		if (user) return Promise.reject(Boom.conflict('Email is already taken'));

		user = new User({
			displayName: request.payload.displayName,
			email: request.payload.email,
			password: request.payload.password
		});

		return user.save();
	};

	const replyWithToken = function (user) {
		reply({
			token: internal.createJWT(user)
		});
	};

	const reportError = function (error) {
		if (error.isBoom) return reply(error);
		return reply(Boom.badImplementation(error.message));
	};
}