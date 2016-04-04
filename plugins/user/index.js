'use strict';
const jwtAuth = require('./auth/jwt');
const routes = require('./route');

exports.register = function (server, options, next) {
	server.register(require('hapi-auth-jwt2'), function (error) {

	server.auth.strategy('token', 'jwt', {
		key: options.auth.tokenSecret,
		validateFunc: jwtAuth.validate,
		verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
	});

	server.route(routes);
});
next();
};
exports.register.attributes = {
	name: 'user'
};