const defaultCtrl = require('./routes/default.js');
const apiCtrl = require('./routes/api');
const authCtrl = require('./routes/auth');

module.exports = [
	{ path: '/api/me', method: 'GET', config: apiCtrl.getMe },
	{ path: '/api/me', method: 'PUT', config: apiCtrl.putMe },

	{ path: '/auth/login', method: 'GET', config: authCtrl.getLogin },
	{ path: '/auth/login', method: 'POST', config: authCtrl.postLogin },
	{ path: '/auth/signup', method: 'POST', config: authCtrl.postSignup },

	{ path: '/auth/google', method: 'POST', config: authCtrl.postGoogle },
	//{ path: '/auth/github', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/instagram', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/linkedin', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/live', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/facebook', method: 'POST', config: authCtrl.postFacebook },
	//{ path: '/auth/yahoo', method: 'POST', config: defaultCtrl.any },
	{ path: '/auth/twitter', method: 'POST', config: authCtrl.postTwitter },
	//{ path: '/auth/foursquare', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/twitch', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/bitbucket', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/unlink', method: 'POST', config: defaultCtrl.any }
];