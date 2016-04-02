'use strict';
exports.register = function (server, options, next) {
	server.route(require('./route.js'));

	next();
};
exports.register.attributes = {
	name: 'user'
};