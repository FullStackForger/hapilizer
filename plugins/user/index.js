'use strict';
const jwtAuth = require('./auth/jwt');
const basicAuth = require('./auth/basic');
const routes = require('./routes');
const plugins = [
	require('hapi-auth-jwt2'),
	require('hapi-auth-basic')
];

exports.register = function (server, options, next) {
	server.register(plugins, function (error) {
		const tokenOpts = options.auth.token;

		server.auth.strategy('token', 'jwt', {
			key: tokenOpts.secret,
			validateFunc: jwtAuth.validate,
			verifyOptions: { algorithms: tokenOpts.algorithms }
		});

		server.auth.strategy('basic', 'basic', {
			validateFunc: basicAuth.validate
		});

		server.route(routes);
	});

	next();
};

exports.register.attributes = {
	name: 'user'
};