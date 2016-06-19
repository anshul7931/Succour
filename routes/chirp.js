var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    var vm=
    {
        title: 'Chirp'
    };
  res.render('chirp/index',vm);
});


router.get('/main', function(req, res, next) {
    var vm=
    {
        title: 'Chirp'
    };
  res.render('chirp/main',vm);
});


router.get('/signup', function(req, res, next) {
    var vm=
    {
        title: 'Chirp'
    };
  res.render('chirp/signup',vm);
});


router.get('/edit-profile', function(req, res, next) {
    var vm=
    {
        title: 'Chirp'
    };
  res.render('chirp/edit-profile-view',vm);
});

router.get('/follow', function(req, res, next) {
    var vm=
    {
        title: 'Chirp'
    };
  res.render('chirp/follow',vm);
});


module.exports = router;