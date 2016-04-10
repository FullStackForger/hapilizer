'use strict';
const Joi = require('joi');

const jwtAuth = require('./auth/jwt');
const basicAuth = require('./auth/basic');
const routes = require('./routes');
const schema = require('./core/schema');
const plugins = [
	require('hapi-auth-jwt2'),
	require('hapi-auth-basic')
];

exports.register = function (server, options, next) {
	const validation = Joi.validate(options, schema);
	if (validation.error) return next(validation.error);

	server.register(plugins, function (error) {
		if (error) return next(error);

		const tokenOpts = options.token;

		// set default strategy
		server.auth.strategy('jwt', 'jwt', true, {
			key: tokenOpts.secret,
			validateFunc: jwtAuth.validate,
			verifyOptions: { algorithms: tokenOpts.algorithms }
		});

		server.auth.strategy('basic', 'basic', {
			validateFunc: basicAuth.validate
		});

		server.route(routes);
		next();
	});
};

exports.register.attributes = {
	name: 'user'
};