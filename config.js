module.exports = {
	server: {
		host: process.env.PORT || 'localhost',
		port: process.env.HOST || 8080
	},
	database: {
		host: process.env.MONGO_HOST || '127.0.0.1',
		port: process.env.MONGO_PORT || 27017,
		db: process.env.MONGO_DB || 'hapilizer',
		username: process.env.MONGO_HOST || '',
		password: process.env.MONGO_HOST || ''
	},
	auth: {
		// App Settings
		tokenSecret: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET'

		/*
		// OAuth 2.0
		FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'YOUR_FACEBOOK_CLIENT_SECRET',
		FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || 'YOUR_FOURSQUARE_CLIENT_SECRET',
		GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
		GITHUB_SECRET: process.env.GITHUB_SECRET || 'YOUR_GITHUB_CLIENT_SECRET',
		INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET || 'YOUR_INSTAGRAM_CLIENT_SECRET',
		LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'YOUR_LINKEDIN_CLIENT_SECRET',
		TWITCH_SECRET: process.env.TWITCH_SECRET || 'YOUR_TWITCH_CLIENT_SECRET',
		WINDOWS_LIVE_SECRET: process.env.WINDOWS_LIVE_SECRET || 'YOUR_MICROSOFT_CLIENT_SECRET',
		YAHOO_SECRET: process.env.YAHOO_SECRET || 'YOUR_YAHOO_CLIENT_SECRET',
		BITBUCKET_SECRET: process.env.YAHOO_SECRET || 'YOUR_BITBUCKET_CLIENT_SECRET',

		// OAuth 1.0
		TWITTER_KEY: process.env.TWITTER_KEY || 'YOUR_TWITTER_CONSUMER_KEY',
		TWITTER_SECRET: process.env.TWITTER_SECRET || 'YOUR_TWITTER_CONSUMER_SECRET'
		*/
	}
};
