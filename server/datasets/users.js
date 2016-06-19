var mongoose = require('mongoose');

module.exports = mongoose.model('chirp',{
	email: String,
	password: String,
	image: String,
	username: String,
	bio: String,
	following: [{userId: String}],
	followers: [{userId: String}]
});