'use strict';
const Joi = require('joi');
const internals = {};

exports.register = function (server, options, next) {
	const validation = Joi.validate(options, internals.schema);
	if (validation.error) return next(validation.error);

	const plugins = [{
		register: require('hapi-app-spa'),
		options: {
			auth: false,
			index: 'index.html',
			assets: [
				'css', 'app', 'vendor', 'partials',   // <- assets
				'auth', 'user'                        // <- endpoints
			],
			relativeTo: './example/client'
		}
	},{
		register: require('./db/index'),
		options: options.database
	},{
		register: require('./user/index'),
		options: options.auth
	}];

	server.register(plugins, (err) => next(err));
};

exports.register.attributes = {
	pkg: require('./../package.json')
};

internals.schema = Joi.object({
	database: Joi.object(),
	auth: Joi.object()
});
