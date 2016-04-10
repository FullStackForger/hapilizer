'use strict';

// Load modules
const Path = require('path');
const Boom = require('boom');
const Code = require('code');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Lab = require('lab');

// Load internal modules
const Hapilizer = require('./hapilizer');
const Mongoose = require('mongoose');

// Declare suite
const internals = {};

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const beforeEach = lab.beforeEach;
const afterEach = lab.afterEach;
const it = lab.it;
const expect = Code.expect;


describe('plugin', () => {
	let server;

	beforeEach((next) => {
		server = new Hapi.Server();
		server.connection({});
		next();
	});

	afterEach((next) => {
		try { Mongoose.connection.close() } catch (e) { } // no need to log anything
		next();
	});

	it('should not register without authentication options', (done) => {
		const plugin = { register: Hapilizer, options: { } };
		server.register(plugin, (err) => {
			expect(err.isJoi).to.be.true;
			expect(err.message).to.equal('child "token" fails because ["token" is required]');
			done();
		});
	});

	it('should not register with invalid database options', (done) => {
		const plugin = { register: Hapilizer, options: { database: null } };
		server.register(plugin, (err) => {
			expect(err.message).to.equal('child "database" fails because ["database" must be an object]');
			done();
		});
	});

	it('should not register with invalid database options', (done) => {
		const plugin = {
			register: Hapilizer,
			options: {
				database: { port: 'XXX' },
				auth: { tokenSecret: 'secret'}
			}
		};
		server.register(plugin, (err) => {
			expect(err).to.exist();
			expect(err.message).to.be.equal('child "port" fails because ["port" must be a number]');
			done();
		});
	});

	it('should not register with invalid authentication options', (done) => {
		const plugin = { register: Hapilizer, options: { invalidValue: 123 } };
		server.register(plugin, (err) => {
			expect(err).to.not.be.null;
			done();
		});
	});

	it('should register with default values', (done) => {
		const plugin = { register: Hapilizer, options: { auth: { token: { secret: 'my secret' } } } };
		server.register(plugin, (err) => {
			expect(err).to.not.exist();
			done();
		})
	});
});