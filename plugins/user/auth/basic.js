'use strict';
const Boom = require('boom');

const User = require('../model');
const internal = require('../core/helpers');

exports.validate = function (request, username, password, callback) {
	User.findOne({ email: username }, '+password', function(err, user) {
		const errMsg = 'Invalid email and/or password';
		if (!user) return callback(Boom.unauthorized(errMsg), false);

		user.comparePassword(password, function(err, matches) {
			if (!matches) return callback(Boom.unauthorized(errMsg), false);

			callback(null, true, {
				token: internal.createJWT(user),
				email: username
			});
		});
	});
};