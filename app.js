var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var passport=require('passport');
var expressSession=require("express-session");
var flash=require('connect-flash');
var connectMongo=require('connect-mongo');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var chirp = require('./routes/chirp');


var MongoStore=connectMongo(expressSession);

var passportConfig=require('./auth/passport-config');
var restrict=require('./auth/restrict');
var db= mongojs('contactlist',['contactlist']);
var db1= mongojs('tweets',['tweets']);
var config = require('./config');
var multiPart = require('connect-multiparty');
passportConfig();
var multiPartMiddleware = multiPart();

var app = express();

app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules',express.static(__dirname + '/node_modules')); 
app.use('/uploads',express.static(__dirname + '/uploads'));




mongoose.connect(config.mongoUri);


var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var WasteController = require('./server/controllers/waste-controller');
var userController = require('./server/controllers/user-controller');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multiPartMiddleware);

app.use(expressSession(
  {
      secret: 'Succour',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
  }
));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

//app.use(restrict);
app.use('/posts',posts);
app.use('/chirp',chirp);


//36 start

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login); //Routes HTTP POST requests to the specified path with the specified callback functions.
app.post('/api/user/ref', authenticationController.reflocal);

//Profile
app.post('/api/profile/editDetails',multiPartMiddleware, profileController.updateDetails);

//Wastes
app.post('/api/waste/post', WasteController.postWastes);
app.post('/api/waste/get', WasteController.getWastes);

//Users
app.get('/api/users/get', userController.getUsers); //Routes HTTP GET requests to the specified path with the specified callback functions.
app.post('/api/users/follow', userController.followUser);
app.post('/api/users/unfollow', userController.unfollowUser);

/*
//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login); //Routes HTTP POST requests to the specified path with the specified callback functions.
app.post('/api/user/ref', authenticationController.reflocal);

//Profile
app.post('/api/profile/editDetails',multiPartMiddleware, profileController.updateDetails);

//Wastes
app.post('/api/waste/post', WasteController.postWastes);
app.post('/api/waste/get', WasteController.getWastes);

//Users
app.get('/api/users/get', userController.getUsers); //Routes HTTP GET requests to the specified path with the specified callback functions.
app.post('/api/users/follow', userController.followUser);
app.post('/api/users/unfollow', userController.unfollowUser);
*/
//36 end

//331 start

app.get('/contactlist',function(req,res){
    console.log("I received a GET request")

   db.contactlist.find(function(err,docs){
    console.log(docs);
    res.json(docs);
   });
});

app.post('/contactlist', function(req, res){
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc){
    res.json(doc);
  })

});
app.get('/tweets',function(req,res){
    console.log("I received a GET request")

   db1.tweets.find(function(err,docs){
    
    console.log(docs);
    res.json(docs);
   });
});

app.post('/tweets', function(req, res){
  console.log(req.body);
  db1.tweets.insert(req.body, function(err, doc){
    res.json(doc);
  })

});

//331 end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
