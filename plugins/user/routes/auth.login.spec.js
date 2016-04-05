'use strict';
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Internals
const Suite = require('../test/user.suite');

// Helpers
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const it = lab.it;
const expect = Code.expect;

before(Suite.setupServer);
before(Suite.db.connect);

describe('GET /auth/login', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply (200)', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {
				authorization: Suite.header.getBasicAuthorization('test.user@gmail.com', 'test.user')
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it('should reply unauthorised (401) for missing credentials', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {}
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with Bad header (400) for invalid header', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {Authorization: 'Basic invalid'}
		}, (res) => {
			expect(res.statusCode).to.equal(400);
			done();
		});
	});
});

describe('POST /auth/login', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply (200) for POST with credentials', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			headers: {
				authorization: Suite.header.getBasicAuthorization('test.user@gmail.com', 'test.user')
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			done();
		});
	});

	it('should reply unauthorised (401) for POST with missing credentials', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			headers: { }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with Bad header (400) for POST with invalid header', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			headers: { Authorization: 'Basic invalid' }
		}, (res) => {
			expect(res.statusCode).to.equal(400);
			done();
		});
	});
});