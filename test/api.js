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

describe('api/me', () => {
	let server;
	const privateKey = 'PajeH0mz4of85T9FB1oFzaB39lbNLbDbtCQ';


	beforeEach((next) => {
		const plugin = { register: Hapilizer, options: { auth: { token: { secret: privateKey } } } };
		const connection = { labels: 'api' };

		server = new Hapi.Server();
		server.connection(connection);
		server.register(plugin, (err) => {
			next(err);
		});
	});

	afterEach((next) => {
		try { Mongoose.connection.close() } catch (e) {
			debugger;
		} // no need to log anything
		next();
	});

	it('should reply with unauthorised (401) for GET request', (done) => {
		server.inject({
			url: '/api/me',
			method: 'GET',
			headers: { }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply (200) for GET request', (done) => {
		server.inject({
			url: '/api/me',
			method: 'GET',
			headers: {
				authorization: internals.tokenHeader('John', privateKey)
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it('should reply with unauthorised (401) for PUT request', (done) => {
		server.inject({
			url: '/api/me',
			method: 'GET',
			headers: { }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply (200) for PUT request', (done) => {
		server.inject({
			url: '/api/me',
			method: 'GET',
			headers: {
				authorization: internals.tokenHeader('John', privateKey)
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

});

internals.tokenHeader = function (username, privateKey, options) {
	options = options || {};
	return 'Bearer ' + Jwt.sign({username : username}, privateKey, options);
};