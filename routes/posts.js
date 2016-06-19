var express = require('express');
var router = express.Router();
var restrict=require('../auth/restrict');

/* GET users listing. */
router.get('/',restrict, function(req, res, next) {
  var vm={
    title: 'Make A Selection',
    firstName: req.user?req.user.firstName:null
  }
  res.render('posts/index',vm);
});


router.get('/contact', function(req, res, next) {
    var vm=
    {
        title: 'Contacts'
    };
  res.render('posts/contact',vm);
});

router.get('/post', function(req, res, next) {
    var vm=
    {
        title: 'Posts'
    };
  res.render('posts/post',vm);
});

router.get('/index1', function(req, res, next) {
    var vm=
    {
        title: 'Details'
    };
  res.render('posts/index1',vm);
});

router.get('/about', function(req, res, next) {
    var vm=
    {
        title: 'About Developers'
    };
  res.render('posts/about',vm);
});

module.exports = router;
