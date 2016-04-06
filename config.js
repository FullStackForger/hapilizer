module.exports = {
	server: {
		host: process.env.PORT || 'localhost',
		port: process.env.HOST || 8080
	},
	database: {
		host: process.env.MONGO_HOST || '127.0.0.1',
		port: process.env.MONGO_PORT || 27017,
		db: process.env.MONGO_DB || 'Hapilizer',
		username: process.env.MONGO_HOST || '',
		password: process.env.MONGO_HOST || ''
	},
	auth: {
		// App Settings
		token: {
			secret: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',
			algorithms: [ 'HS256' ] // only allow HS256 algorithm
		}
	}
};
