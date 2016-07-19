'use strict';
const Joi = require('joi');

module.exports = Joi.object({
	token: Joi.object({
		secret: Joi.string().required(),
		algorithms: Joi.array().items(Joi.string()).default(['HS256'])
	}).required(),
	providers: Joi.object({
		facebook: Joi.object({
			clientId: Joi.string().allow(''),
			secret: Joi.string().allow('')
		}),
		google: Joi.object({
			clientId: Joi.string().allow(''),
			secret: Joi.string().allow('')
		})
	})
});
