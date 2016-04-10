'use strict';
const Joi = require('joi');

module.exports = Joi.object({
	token: Joi.object({
		secret: Joi.string().required(),
		algorithms: Joi.array().items(Joi.string()).default(['HS256'])
	}),
	providers: Joi.object({
		facebook: Joi.object({
			clientId: Joi.string().required(),
			secret: Joi.string().required()
		}),
		google: Joi.object({
			clientId: Joi.string().required(),
			secret: Joi.string().required()
		})
	})
});