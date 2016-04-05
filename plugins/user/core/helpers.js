'use strict';
const JWT = require('jsonwebtoken');

exports.createJWT = function(user) {
	const payload = {
		sub: user._id,
		iat: Moment().unix(),
		exp: Moment().add(14, 'days').unix()
	};

	return JWT.sign(payload, request.server.registrations.user.options.auth.token.secret);
};