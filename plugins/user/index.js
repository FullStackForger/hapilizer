'use strict';
const auth = require('./auth');
const routes = require('./route');

exports.register = function (server, options, next) {
	server.register(require('hapi-auth-jwt2'), function (error) {

	server.auth.strategy('token', 'jwt', {
		key: options.auth.tokenSecret,
		validateFunc: auth.validate,
		verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
	});

	server.route(routes);
});
next();
};
exports.register.attributes = {
	name: 'user'
};