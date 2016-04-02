const defaultCtrl = require('./controllers/default.js');

module.exports = [
	{ path: '/api/me', method: 'GET', config: defaultCtrl.any },
	{ path: '/api/me', method: 'PUT', config: defaultCtrl.any },
	{ path: '/auth/login', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/signup', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/google', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/github', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/instagram', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/linkedin', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/live', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/facebook', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/yahoo', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/twitter', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/foursquare', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/twitch', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/bitbucket', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/unlink', method: 'POST', config: defaultCtrl.any }
];