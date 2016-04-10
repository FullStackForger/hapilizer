'use strict';
const User = require('../model');
const Joi = require('joi');
const Boom = require('boom');

const Helpers = require('../core/helpers');
const internal = {};

exports.post = {
	validate: {
		payload: {
			provider: Joi.string().required()
		}
	},
	handler: function (request, reply) {
		const provider = request.payload.provider;
		const providers = Object.keys(reply.realm.pluginOptions.providers);

		if (providers.indexOf(provider) === -1) {
			reply(Boom.badRequest(`provider ${provider} is not supported`));
		}

		User
			.findById(request.auth.credentials.user._id)
			.then((user) => {
				user[provider] = undefined;
				return user.save();
			})
			.then(() => {
				reply('OK');
			});
	}
};