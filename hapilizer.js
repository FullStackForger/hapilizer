'use strict';
const Joi = require('joi');

const internals = {};

internals.schema = Joi.object({
	database: Joi.object({
		host: Joi.string(),
		port: Joi.number(),
		db: Joi.string(),
		username: Joi.string().empty(''),
		password: Joi.string().empty('')
	}),
	auth: Joi.object({
		tokenSecret: Joi.string().required()
	}).required()
});

exports.register = function (server, options, next) {
	const validation = Joi.validate(options, internals.schema);
	if (validation.error) return next(validation.error);

	const plugins = [{
		register: require('hapi-app-spa'),
		options: {
			index: 'index.html',
			assets: ['css', 'app', 'vendor', 'partials'],
			//assets: ['css', 'img', 'js', 'partials', 'files'],
			relativeTo: require('path').join(__dirname, './client')
		}
	},{
		register: require('./plugins/db'),
		options: { database: options.database }
	},{
		register: require('./plugins/user'),
		options: { auth: options.auth }
	}];
	
	server.register(plugins, (err) => next(err));
};

exports.register.attributes = {
	pkg: require('./package.json')
};
