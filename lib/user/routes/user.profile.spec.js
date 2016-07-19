'use strict';
const Code = require('code');
const Hoek = require('hoek');
const Lab = require('lab');

// Internals
const Suite = require('../test/user.suite');
const User = require('../model');
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

describe('GET /user/{userId}', () => {

	beforeEach(Suite.db.resetDatabase);

	it('should reply (200) with user profile', (done) => {
		User
			.findOne({ email: 'test.user@gmail.com' })
			.then(requestProfile)
			.catch((err) => done(err) );

		function requestProfile (user) {
			expect(user).to.not.be.null();

			Suite.server.inject({
				url: `/user/${user._id}`,
				method: 'GET',
				headers: {
					authorization: Suite.header.getJWTAuthorization(user)
				}
			}, (res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.payload).to.exist();
				expect(res.result).to.exist();
				expect(res.result.email).to.be.string();
				expect(res.result.displayName).to.be.string();
				done();
			});
		}
	});

	it('should reply with unauthorised (401) for missing token', (done) => {
		Suite.server.inject({
			url: '/user/123', // id doesn't matter
			method: 'GET',
			headers: { /* Authorization header is missing */ }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with unauthorised (401) for invalid header', (done) => {
		Suite.server.inject({
			url: '/user/123', // id doesn't matter
			method: 'GET',
			headers: { Authorization: 'Basic invalid' }
		}, (res) => {
			expect(res.statusCode).to.equal(401);
			done();
		});
	});

	it('should reply with internal error (500) when something goes wrong', (done) => {
		User
			.findOne({ email: 'test.user@gmail.com' })
			.then(requestProfile)
			.catch((err) => done(err) );

		function requestProfile (user) {
			expect(user).to.not.be.null();

			const handlerStub = Sinon.stub(require('../model'), 'findOne', function() {
				throw new Error('something broke');
			});

			Suite.server.inject({
				url: `/user/${user._id}`,
				method: 'GET',
				headers: {
					authorization: Suite.header.getJWTAuthorization(user)
				}
			}, (res) => {
				expect(res.statusCode).to.equal(500);
				handlerStub.restore();
				done();
			});
		}
	});

});