'use strict';
const Joi = require('joi');
const Boom = require('boom');

const User = require('../model');
const Helpers = require('../core/helpers');

// error message
const unauthorizedMsg = 'Invalid email and/or password';

exports.get = {
	auth: 'basic',
	handler: function (request, reply) {
		reply({ token: request.auth.credentials.token });
	}
};

exports.post = {
	auth: false,
	validate: {
		payload: {
			email: Joi.string().email().required(),
			password: Joi.string().min(3).max(20).required()
		}
	},
	handler: function (request, reply) {
		User.findOne({ email: request.payload.email }, '+password', function(err, user) {
			if (!user) return reply(Boom.unauthorized(unauthorizedMsg));

			user.comparePassword(request.payload.password, function(err, verified) {
				if (!verified) {
					return reply(Boom.unauthorized(unauthorizedMsg));
				}
				const secret = reply.realm.pluginOptions.auth.token.secret;
				reply({ token: Helpers.createJWT(user, secret) });
			});
		});
	}
};



