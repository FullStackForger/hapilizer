'use strict';
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const Joi = require('joi');
const Moment = require('moment');

const defaultCtrl = require('./default.js');
const User = require('../model');

exports.getLogin =
exports.postLogin = {
	handler: defaultCtrl.any.handler,
	auth: 'basic'
};

exports.postSignup = {
	handler: postSignup,
	auth: false,
	validate: {
		payload: {
			email: Joi.string().email(),
			displayName: Joi.string().min(3).max(40),
			password: Joi.string().min(3).max(20)
		}
	}
};

exports.postGoogle = {
	handler: defaultCtrl.any.handler
};

exports.postFacebook = {
	handler: defaultCtrl.any.handler
};

exports.postTwitter= {
	handler: defaultCtrl.any.handler
};

function postSignup (request, reply) {

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

	function replyWithToken(user) {
		reply({
			token: createJWT(user)
		});
	}

	function reportError(error) {
		if (error.isBoom) return reply(error);
		return reply(Boom.badImplementation(error.message));
	}

	function createJWT(user) {
		const payload = {
			sub: user._id,
			iat: Moment().unix(),
			exp: Moment().add(14, 'days').unix()
		};

		return JWT.sign(payload, request.server.registrations.user.options.auth.token.secret);
	}
}
