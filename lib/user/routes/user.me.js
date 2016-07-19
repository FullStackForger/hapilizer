'user strict';
const Boom = require('boom');
const User = require('../model');

exports.get = {
	handler: handleGetMe,
	auth: 'jwt'
};

exports.put = {
	handler: handlePutMe,
	auth: 'jwt'
};

function handleGetMe(request, reply) {
	User
		.findById(request.auth.credentials.user._id)
		.then((user) => { reply(user.toObject()) })
		.catch((err) => reply(Boom.badImplementation('Server error', err)));
}

function handlePutMe(request, reply) {
	User.findById(request.auth.credentials.user._id, function(err, user) {
		if (err) return reply(Boom.badImplementation('Server error'));
		if (!user) return reply(Boom.badImplementation(`User doesn't exist`));

		user.displayName = request.payload.displayName || user.displayName;
		user.email = request.payload.email || user.email;
		user.bio = request.payload.bio || user.bio;

		user.save(function(err) {
			if (err) return reply(Boom.badImplementation('Server error'));
			reply('OK');
		});
	});
}