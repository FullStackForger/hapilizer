// --------------------------------------------------------------------
// Important!
// Do not modify this file.
// Check README.md for more details on how to configure this package.
// --------------------------------------------------------------------
"use strict";
var fs = require('fs');
var configJSONPath = 'config.json';
var Hoek = require('hoek');
var defaults = {
	server: {
		host: process.env.PORT || 'localhost',
		port: process.env.HOST || 8080
	},
	database: {
		host: process.env.MONGO_HOST || '127.0.0.1',
		port: process.env.MONGO_PORT || 27017,
		db: process.env.MONGO_DB || 'Hapilizer',
		username: process.env.MONGO_HOST || '',
		password: process.env.MONGO_HOST || ''
	},
	auth: {
		// App Settings
		token: {
			secret: process.env.TOKEN_SECRET || 'secret_token',
			algorithms: [ 'HS256' ] // only allow HS256 algorithm
		},
		providers: {
			facebook: {
				clientId: process.env.FACEBOOK_CLIENT_ID || '',
				secret:   process.env.FACEBOOK_SECRET || ''
			}
		}
	}
};

var config = {};
try {
	let options = JSON.parse(fs.readFileSync(configJSONPath, 'utf8'));
	config = Hoek.applyToDefaults(defaults, options);
} catch (e) {
	config = Hoek.applyToDefaults(defaults, {});
}

module.exports = config;
