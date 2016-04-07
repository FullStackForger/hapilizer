'use strict';
const Joi = require('joi');
const User = require('../model');

exports.get = {
	auth: 'jwt',
	validate: {
		params: {
			userId: Joi.string().required()
		}
	},
	handler: function (request, reply) {
		User.findById(request.params.userId, function (err, user) {
			if (err) return reply(Boom.badImplementation('Server error', err));
			if (!user) return reply(Boom.notFound('User not found'));
			reply(user.toObject());
		});
	}
};