//var mongoose = require('mongoose');
var User = require('../datasets/users');

module.exports.signup = function(req, res){
	
	console.log(req.body);

	var user = new User(req.body);
	user.save();

	res.json(req.body);
}

module.exports.login = function(req,res){

	User.find(req.body, function(err, results){
		
		if(err){
			console.log("error out");
		}

		if(results && results.length === 1){
			var userData = results[0];
			res.json({email: req.body.email,
						_id: userData._id,
						username: userData.username,
						image: userData.image,
						following: userData.following,
						followers: userData.followers
					});
		}
	})
}

module.exports.reflocal = function(req,res){

	console.log(req.body._id);

	User.findById(req.body._id, function(err, results){
		
		if(err){
			console.log("error out");
		}
		console.log(results);

		if(results){
			var userData = results;
			res.json({email: req.body.email,
						_id: userData._id,
						username: userData.username,
						image: userData.image,
						following: userData.following,
						followers: userData.followers
					});
		}
	})
}