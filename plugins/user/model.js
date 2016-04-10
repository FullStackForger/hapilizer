const Mongoose = require('mongoose');
const Bcrypt = require('bcrypt');

var userSchema = new Mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
	password: { type: String, select: false },
	displayName: String,
	bio: String,
	picture: String,
	bitbucket: String,
	facebook: String,
	foursquare: String,
	google: String,
	github: String,
	instagram: String,
	linkedin: String,
	live: String,
	yahoo: String,
	twitter: String,
	twitch: String
}, {
	toObject: {
		transform: function (doc, ret) {
			delete ret.__v;
		}
	}
});

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	Bcrypt.genSalt(10, function(err, salt) {
		Bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(password, done) {
	Bcrypt.compare(password, this.password, function(err, isMatch) {
		done(err, isMatch);
	});
};

var User = module.exports = Mongoose.model('User', userSchema);