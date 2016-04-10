module.exports = [{
	email: 'test.user@gmail.com',
	displayName: 'Test User',
	password: 'test.user'
}, {
	email: 'another.user@gmail.com',
	displayName: 'Another User',
	password: 'another.user',
	bio: `
		Regular geek with **markdown bio**,
		including some links to [google][http://google.com] search engine.
	`,
	picture: 'https://graph.facebook.com/v2.3/1607843726204668/picture?type=large',
	facebook: {
		id: '123456789',
		name: 'Test User',
		first_name: 'Test',
		last_name: 'User',
		token: {
			expires_in: 567431,
			access_token: 'EAAYacUJvfQEBAPXasBzL1Tm8rKRr34ZD',
			token_type: 'bearer'
		},
		picture: 'https://graph.facebook.com/v2.3/1607843726204668/picture?type=large'
	}
}];