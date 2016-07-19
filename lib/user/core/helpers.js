'use strict';
const JWT = require('jsonwebtoken');
const Moment = require('moment');

exports.createJWT = function(user, secret) {
	const payload = {
		sub: user._id,
		iat: Moment().unix(),
		exp: Moment().add(14, 'days').unix()
	};

	return JWT.sign(payload, secret);
};