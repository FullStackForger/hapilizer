'use strict';
const Hoek = require('hoek');
const Mongoose = require('mongoose');
const defaults = {
	host: '127.0.0.1',
	port: 27017,
	db: 'test-hapi-mongoose-plugin',
	username: '',
	password: ''
};

exports.register = function (server, options, next) {
	let settings = Hoek.applyToDefaults(defaults, options);

	Mongoose.connection.on('error', (error) => {
		next(error);
	});

	Mongoose.connection.once('open', () => {
		next();
	});

	Mongoose.connect('mongodb://' + settings.database.host + '/' + settings.database.db);
};

exports.register.attributes = {
	name: 'mongoose'
};