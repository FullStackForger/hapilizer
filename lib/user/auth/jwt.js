'use strict';
const Boom = require('boom');
const Moment = require('moment');
const User = require('../model');


exports.validate = function (decoded, request, callback) {

	User
		.findOne({_id: decoded.sub })
		.then(generateCredentials)
		.catch((err) => callback(Boom.badImplementation(err.message), false));

	function generateCredentials (user) {

		if (!user) {
			return callback(Boom.forbidden('User not found'), false);
		}

		if (decoded.exp <= Moment().unix()) {
			return callback(Boom.unauthorized('Token has expired'), false);
		}

		return callback(null, true, {
			token: decoded,
			user: user.toObject()
		});
	}
};