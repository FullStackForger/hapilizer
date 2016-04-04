'use strict';

// Load modules
const Path = require('path');
const Boom = require('boom');
const Code = require('code');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Lab = require('lab');
const Jwt  = require('jsonwebtoken');
const Mongoose = require('mongoose');

// Load internal modules
const Hapilizer = require('../hapilizer');

// Declare internals
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const it = lab.it;
const expect = Code.expect;

let server;

internals.header = function (username, password) {
	return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

internals.beforeEach = function (next) {
	const plugin = { register: Hapilizer, options: { auth: { tokenSecret: 'some key' } } };
	const connection = { labels: 'api' };

	server = new Hapi.Server();
	server.connection(connection);
	server.register(plugin, (err) => {
		next(err);
	});
};

internals.afterEach = function (next) {
	try { Mongoose.connection.close() } catch (e) {
		debugger;
	} // no need to log anything
	next();
};

describe('auth/login', () => {

	beforeEach(internals.beforeEach);
	afterEach(internals.afterEach);

	it('should reply unauthorised (401) for GET with missing credentials', (done) => {
		server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: { }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply (200) for GET with credentials', (done) => {
		server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {
				authorization: internals.header('mark', 'some-password')
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	})
});