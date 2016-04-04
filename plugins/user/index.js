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

		server.auth.strategy('token', 'jwt', {
			key: options.auth.tokenSecret,
			validateFunc: jwtAuth.validate,
			verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
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