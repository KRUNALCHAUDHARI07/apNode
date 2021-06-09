var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password:'',
  database:'demo'
})

connection.connect(function (err) {
  if(err){
    console.log("not connected");
  }else{
    console.log("connected");
  }
})
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

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Express' });
});

router.post('/loggedin', function(req, res, next) {
  var name = req.body.email;
  var password= req.body.password;
  console.log(name);

  res.render('loggedin',{ a:name,b:password });
});



router.get('/data',function (req,res,next) {
  connection.query("select * from user",function(err,row){
    if(err) throw err;
    console.log(row);
    res.redirect('/')
  })
})

router.get('/contact', function(req, res, next) {
  res.render('contect',{ title: 'Express' });
});

module.exports = router;
