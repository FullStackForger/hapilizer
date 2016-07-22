const Hapi = require('hapi');

const config = require('./../config');
const hapilizer = require('./../lib/hapilizer');

const server = new Hapi.Server();
const connection = {
	host: config.server.host,
	port: config.server.port
	};

const plugins = [{
	register: hapilizer,
	options: {
		auth: config.auth,
		database: config.database
	}
}];

server.connection(connection);
server.register(plugins, (err) => {
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

