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

describe('POST /auth/register', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply successfully (200) with token', (done) => {
		Suite.server.inject({
			url: '/auth/register',
			method: 'POST',
			payload: {
				email: 'indie.forger@email.com',
				displayName: 'IndieForger',
				password: 'indie.forger'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(200);

			done();
		});
	});

	it('should reply with bad request (400) if payload is missing', (done) => {
		Suite.server.inject({
			url: '/auth/register',
			method: 'POST'
		}, (res) => {
			expect(res.statusCode).to.equal(400);
			done();
		});
	});

	it('should reply with bad request (400) if payload is partially missing', (done) => {
		const sendRequest = function ( payload, next ) {
			Suite.server.inject({ url: '/auth/register', method: 'POST', payload: payload }, (res) => {
				expect(res.statusCode).to.equal(400);
				done();
			});
		};

		Forger.sequence(
			(next) => { sendRequest( { /*email: 'new.user@gmail.com',*/ displayName: 'IndieForger', password: 'indie.forger' }, next )},
			(next) => { sendRequest( { email: 'new.user@gmail.com', /*displayName: 'IndieForger',*/ password: 'indie.forger' }, next )},
			(next) => { sendRequest( { email: 'new.user@gmail.com', displayName: 'IndieForger'/*, password: 'indie.forger'*/ }, next )}
		)
		.then(() => done())
		.catch((err) => done(err));

	});


	it('should reply with conflict error (409) when email exist', (done) => {
		Suite.server.inject({
			url: '/auth/register',
			method: 'POST',
			payload: {
				email: 'test.user@gmail.com',
				displayName: 'IndieForger',
				password: 'indie.forger'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(409);
			done();
		});
	});

	it('should reply with internal error (500) when something goes wrong', (done) => {
		const handlerStub = Sinon.stub(require('../model'), 'findOne', function() {
			throw new Error('something broke');
		});

		Suite.server.inject({
			url: '/auth/register',
			method: 'POST',
			payload: {
				email: 'test.user@gmail.com',
				displayName: 'IndieForger',
				password: 'indie.forger'
			}
		}, (res) => {
			expect(res.statusCode).to.equal(500);
			handlerStub.restore();
			done();
		});
	});

});