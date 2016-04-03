'use strict';
const Hoek = require('hoek');
const Mongoose = require('mongoose');

const defaults = {
	host: '127.0.0.1',
	port: 27017,
	db: 'Hapilizer',
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

	let credentials = '';
	if (settings.username !== '' && settings.password !== '') {
		credentials = settings.username + ':' + settings.password + '@';
	}

	Mongoose.connect('mongodb://' + credentials + settings.host + ':' + settings.port + '/' + settings.db);
};

exports.register.attributes = {
	name: 'Mongoose'
};