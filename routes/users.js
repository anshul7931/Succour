var express = require('express');
var router = express.Router();
var passport=require('passport');
var config=require('../config');
var userService = require('../service/user-service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//it will display the /users/view page
router.get('/create', function(req, res, next) {
    var vm=
    {
        title: 'Create an account'
    };
  res.render('users/create',vm);
});

router.post('/create', function(req, res, next) {
    userService.addUser(req.body,function(err) {
    if(err)
    {
        var vm=
        {
            title: 'Create an account',
            input: req.body,//it acquires all the info submitted from the sign up form int the input
            error: err
        };
        delete vm.input.password;//it will delete password from textbox if not valid
        return res.render('users/create',vm);
    }
    req.login(req.body,function(err){
        res.redirect('/posts');
    });
});
});

router.post('/login',
    function(req,res,next){
        if(req.body.rememberMe){
            req.session.cookie.maxAge=config.cookieMaxAge;
        }
        next();
    },
    passport.authenticate('local',{
        failureRedirect:'/',
        successRedirect:'/posts',
        failureFlash:'Invalid credentials'
    }));

router.get('/logout',function(req,res,next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
