'use strict';
exports.validate = function (request, decodedToken, callback) {
	let error;
	let credentials = {};

	if (!credentials) {
		return callback(error, false, credentials);
	}

	return callback(error, true, credentials)
};