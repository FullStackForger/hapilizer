'use strict';
exports.validate = function (decoded, request, callback) {
	// todo: extract from db
	let credentials = decoded;

	if (!credentials) {
		return callback(null, false);
	}

	return callback(null, true, credentials)
};