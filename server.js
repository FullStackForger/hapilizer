const Hapi = require('hapi');
const server = new Hapi.Server();
const connection = {host: 'localhost', port: '3000'};

const plugins = [{
	register: require('hapi-app-spa'),
	options: {
		index: 'index.html',
		assets: ['css', 'app', 'vendor', 'partials'],
		//assets: ['css', 'img', 'js', 'partials', 'files'],
		relativeTo: require('path').join(__dirname, './client')
	}
}];


server.connection(connection);

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

server.register(plugins, (err) => {
	if (err) throw err;

	server.start((err) => {
		if (err) throw err;
		console.log('Server running at:', server.info.uri);
	});
});

