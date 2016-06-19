var User = require('../datasets/users');
var path = require('path');
var fs = require('fs');
var util = require('util');
var mv = require('mv');

module.exports.updateDetails = function(req,res){

	var file = req.files.file;
	var USER = req.body.user;
	var UserId = USER._id;

	console.log("User: "+ util.inspect(USER) + "is submitting " + util.inspect(file));
	
	/*var uploadDate = new Date().toISOString();
	uploadDate = uploadDate.replace(".","");
	uploadDate = uploadDate.replace("-","");
	uploadDate = uploadDate.replace(":","");
	console.log(uploadDate);*/

	var uname = USER.username;
	var ubio = USER.bio;


	var tempPath = file.path;
	var targetPath = path.join(__dirname, "../../uploads/"+UserId+/*uploadDate+*/ file.name);
	var savePath = "/uploads/"+UserId+/*uploadDate+*/ file.name;
    
	//console.log(targetPath);

	mv(tempPath, targetPath, function(err){
		if(err)
			throw err;
		else{
			console.log("success");
		    
		    User.findById(UserId, function(err, userData){
		    	var user = userData;

		    	user.image = savePath;
		    	user.username = uname;
		    	user.bio = ubio;

		    	user.save(function(err){
		    		if(err){
		    			console.log(err);
		    			res.json({status: 500});
		    		}
		    		else{
		    			console.log('saved successfully');
		    			res.json({status: 200});
		    		}
		    	})
		    });
		}
	})
}