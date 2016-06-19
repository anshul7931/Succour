var Users = require('../datasets/users');
var mongoose = require('mongoose');

module.exports.getUsers = function(req, res){

	Users.find({},function(err, allUsers){
		if(err){
			res.error(err);
		}
		else{
			res.json(allUsers);
			//console.log(allUsers);
		}
	})
}

module.exports.followUser = function(req, res){
	var userId = req.body.userId, 
		wasterId = req.body.wasterId;

	Users.findById(wasterId,function(err, waster){
		
		waster.followers.push({userId: userId});
		waster.save();
		
    });

	Users.findById(userId, function(err, user){

		user.following.push({userId: wasterId});
		user.save();
		
	});
	res.json(req.body);
}

module.exports.unfollowUser = function(req, res){
	var userID = req.body.userId, 
		wasterId = req.body.wasterId;

	Users.update({_id: wasterId}, {$pull: {followers: {userId: userID}}}, function(err, waster){
		
		if(err){console.log(err);}
		else{
			console.log("unfollowed.");

		}

	});

	/*Users.findById(wasterId,function(err, waster){
		
		waster.followers.pull({userId: userId});
		waster.save();

	});

	Users.findById(userId, function(err, user){

		user.following.pull({userId: wasterId});
		user.save();
		
	});*/

	Users.update({_id: userID}, {$pull: {following: {userId: wasterId}}},function(err, user){

		if(err){console.log(err);}
		else{
			console.log("unfollowed.");
			
		}
	}); 

	res.json(req.body);
}