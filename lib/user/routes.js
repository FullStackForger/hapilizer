const Routes = {
	default: require('./routes/default.js'),
	auth: {
		login: require('./routes/auth.login'),
		signup: require('./routes/auth.signup'),
		facebook: require('./routes/auth.facebook'),
		unlink: require('./routes/auth.unlink')
	},
	user: {
		me: require('./routes/user.me'),
		profile: require('./routes/user.profile')
	}
};

module.exports = [
	// user endpoints
	{ path: '/user/me', method: 'GET', config: Routes.user.me.get },
	{ path: '/user/me', method: 'PUT', config: Routes.user.me.put },
	{ path: '/user/{userId}', method: 'GET', config: Routes.user.profile.get },
	// standard authentication
	{ path: '/auth/login', method: 'GET', config: Routes.auth.login.get },
	{ path: '/auth/login', method: 'POST', config: Routes.auth.login.post },
	{ path: '/auth/signup', method: 'POST', config: Routes.auth.signup.post },
	// social authentication: unlink
	{ path: '/auth/unlink', method: 'POST', config: Routes.auth.unlink.post },
	// social authentication: with providers
	{ path: '/auth/google', method: 'POST', config: Routes.default.any },
	{ path: '/auth/twitter', method: 'POST', config: Routes.default.any },
	{ path: '/auth/facebook', method: 'POST', config: Routes.auth.facebook.post }
	//{ path: '/auth/github', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/instagram', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/linkedin', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/live', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/yahoo', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/foursquare', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/twitch', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/bitbucket', method: 'POST', config: defaultCtrl.any },
	//{ path: '/auth/unlink', method: 'POST', config: defaultCtrl.any }
];