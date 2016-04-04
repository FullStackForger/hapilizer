'use strict';
const Bcrypt = require('bcrypt');

exports.validate = function (request, username, password, callback) {
  // todo: extract from db
	let credentials = { username: username };

	if (!credentials) {
		return callback(null, false);
	}
	
	
	return callback(null, true, credentials)
	//todo: complete check
	
	Bcrypt.compare(password, credentials.password, (err, isValid) => {

		callback(err, isValid, credentials);
	});
};