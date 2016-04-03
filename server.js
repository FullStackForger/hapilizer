const Hapi = require('hapi');
const Hoek = require('hoek');

const config = require('./config');
const hapilizer = require('./hapilizer');

const server = new Hapi.Server();
const connection = {
	host: config.server.host,
	port: config.server.port
	};

const plugin = {
	register: hapilizer,
	options: {
		auth: config.auth,
		database: config.database
	}
};

server.connection(connection);
server.register(plugin, (err) => {
	if (err) throw err;

	// Log incoming request
	server.ext('onRequest', function (request, reply) {
		console.log(request.path, request.query);
		return reply.continue();
	});

	// Log 500 errors
	server.on('request-error', (request, err) => {
		console.log(`Error (500), reques id: ${request.id}, message: ${err.message}`);
		console.log(err.stack);
	});

	server.start((err) => {
		if (err) throw err;
		console.log('Server running at:', server.info.uri);
	});
});

