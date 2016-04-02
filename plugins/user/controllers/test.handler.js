module.exports = function (request, reply) {
	'use strict';
	reply({
		method: request.method,
		info: request.info,
		path: request.path,
		query: request.query,
		params: request.params
	})
};
