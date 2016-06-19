var mongoose = require('mongoose');

module.exports = mongoose.model('Waste', {
	userImage: String,
	user: String,
	userId: String,
	date: {type: Date, default: Date.now},
	content: String
});