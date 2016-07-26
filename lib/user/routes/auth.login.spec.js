'use strict';
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Internals
const Suite = require('../test/user.suite');
const Forger = require('forger');
const Sinon = require('sinon');

// Helpers
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const before = lab.before;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const after = lab.after;
const it = lab.it;
const expect = Code.expect;

before(Suite.setupServer);
before(Suite.db.connect);
after(Suite.db.dropDatabase);
after(Suite.db.disconnect);

describe('GET /auth/login', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply (200) with token', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {
				authorization: Suite.header.getBasicAuthorization('test.user@gmail.com', 'test.user')
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			expect(res.result.access_token).to.be.string();
			done();
		});
	});

	it('should reply unauthorised (401) for missing credentials', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: { /* missing Authorization header */ }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with Bad header (400) for invalid header', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: { Authorization: 'Basic invalid' }
		}, (res) => {
			expect(res.statusCode).to.equal(400);
			done();
		});
	});

	it('should reply with internal error (500) when something goes wrong', (done) => {
		const handlerStub = Sinon.stub(require('../model'), 'findOne', function() {
			throw new Error('something broke');
		});

		Suite.server.inject({
			url: '/auth/login',
			method: 'GET',
			headers: {
				authorization: Suite.header.getBasicAuthorization('test.user@gmail.com', 'test.user')
			}
		}, (res) => {
			expect(res.statusCode).to.equal(500);
			handlerStub.restore();
			done();
		});
	});
});

describe('POST /auth/login', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply (200) with token to request with valid payload', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			payload: {
				email: 'test.user@gmail.com',
				password: 'test.user'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);
			expect(res.result.access_token).to.be.string();
			done();
		});
	});

	it('should reply unauthorised (401) to request with invalid credentials', (done) => {
		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			payload: {
				email: 'test.user@gmail.com',
				password: 'wrong.password'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with bad request (400) to request with missing credentials', (done) => {
		const sendRequest = function ( payload, next ) {
			Suite.server.inject({ url: '/auth/login', method: 'POST', payload: payload }, (res) => {
				expect(res.statusCode).to.equal(400);
				next();
			});
		};

		Forger.sequence(
			(next) => { sendRequest( { /*email: 'new.user@gmail.com', password: 'indie.forger'*/ }, next )},
			(next) => { sendRequest( { /*email: 'new.user@gmail.com',*/ password: 'indie.forger' }, next )},
			(next) => { sendRequest( { email: 'new.user@gmail.com' /*, password: 'indie.forger'*/ }, next )}
			)
			.then(() => done())
			.catch((err) => done(err));
	});

	it('should reply with internal error (500) when something goes wrong', (done) => {
		const handlerStub = Sinon.stub(require('../model'), 'findOne', function() {
			throw new Error('Internal Query Error');
		});

		Suite.server.inject({
			url: '/auth/login',
			method: 'POST',
			payload: {
				email: 'test.user@gmail.com',
				password: 'test.user'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(500);
			handlerStub.restore();
			done();
		});
	});
});
