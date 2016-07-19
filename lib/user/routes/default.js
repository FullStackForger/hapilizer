'use strict';
exports.any = {
	auth: false,
	handler: function (request, reply) {
		reply({
			method: request.method,
			info: request.info,
			path: request.path,
			query: request.query,
			params: request.params,
			auth: request.auth
		})
	}
};
