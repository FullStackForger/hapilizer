'use strict';
const Code = require('code');
const Hapi = require('hapi');
const JWT = require('jsonwebtoken');

const Mongoose = require('mongoose');
const Forger = require('forger');
const Moment = require('moment');

const UserPlugin = require('../');
const User = require('../model');

const expect = Code.expect;
const suite = module.exports = {};

const optionsMock = require('./options.mock');
const userMockData = require('./userData.mock');

suite.server = null;

suite.setupServer = function (next) {
	const plugin = { register: UserPlugin, options: optionsMock };
	const connection = { labels: 'api' };

	suite.server = new Hapi.Server({ debug: false });
	suite.server.connection(connection);
	suite.server.register(plugin, (err) => {
		next(err);
	});
};

suite.header = {};

suite.header.getBasicAuthorization = function (username, password) {
	return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

suite.header.getJWTAuthorization = function (user) {
	return JWT.sign({
		sub: user._id,
		iat: Moment().unix(),
		exp: Moment().add(14, 'days').unix()
	}, optionsMock.token.secret);
};

suite.db = {};

suite.db.connect = function (next) {
	const connectionURI = `mongodb://localhost/hapilizer_test_db`; // ${Date.now()}
	Mongoose.connect(connectionURI, (err) => {
		expect(err).to.not.exist();
		next();
	});
};

suite.db.disconnect = function (next) {
	Mongoose.connection.close((err) => {
		expect(err).to.not.exist();
		next();
	});
};

suite.db.resetDatabase = function (next) {
	suite.db.dropDatabase((err)=> {
		expect(err).to.not.exist();

		suite.db.importUserData((err) => {
			expect(err).to.not.exist();
			next();
		});
	})
};

suite.db.dropDatabase = function (next) {
	expect(Mongoose.connection.db).to.exist();
	Mongoose.connection.db.dropDatabase((err, result) => {
		expect(err).to.not.exist();
		expect(result).to.equal(true);
		next();
	})
};

suite.db.importUserData = function (next) {
	let index = 0;
	const saveUser = function (complete) {
		new User( userMockData[index] ).save((err, user) => {
			index ++;
			complete();
		});
	};
	const inProgress = function () {
		return index < userMockData.length;
	};

	Forger
		.doWhile(saveUser, inProgress)
		.then(() => {
			next()
		}).catch((err) => {
			expect(err).to.not.exist();
			next(err)
		});
};
