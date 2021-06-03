var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about',{ title: 'Express' });
});
router.get('/service', function(req, res, next) {
  res.render('service',{ title: 'Express' });
});



router.get('/contact', function(req, res, next) {
  res.render('contect',{ title: 'Express' });
});

module.exports = router;
