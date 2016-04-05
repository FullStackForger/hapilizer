'use strict';
const Code = require('code');
const Hapi = require('hapi');
const JWT = require('jsonwebtoken');

const Mongoose = require('mongoose');
const UserPlugin = require('../');

const expect = Code.expect;
const suite = module.exports = {};

const optionsMock = require('./options.mock');
const userDataMock = require('./userData.mock');

suite.server = null;

suite.setupServer = function (next) {
	const plugin = { register: UserPlugin, options: optionsMock };
	const connection = { labels: 'api' };

	suite.server = new Hapi.Server();
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
	}, optionsMock.auth.token.secret);
};

suite.db = {};

suite.db.connect = function (next) {
	const connectionURI = `mongodb://localhost/maitredhotel_test_auth_service_${Date.now()}`;
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
	suite.db.dropDatabase(()=> {
		suite.db.importUserData(next);
	})
};

suite.db.dropDatabase = function (next) {
	expect(Mongoose.connection.db).to.exist();
	Mongoose.connection.db
		.dropDatabase()
		.then(next)
		.catch((err) => expect(err).to.not.exist());
};

suite.db.importUserData = function (next) {
	// todo: import mock data
	next();
};