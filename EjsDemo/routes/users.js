var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var alert= require('alert')
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'demo'
})

conn.connect(function (err) {
  if(!err){
    console.log("DB COnnected");
  }else{
    console.log(err); 
  }
})

// /users
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>respond with a resource</h1>');
});


// 'users/login'
router.post('/login',function(req,res){

  var data = {
  email : req.body.email,
  password : req.body.pass
}
  var sql="select * from user where email= ?" + data.email + " && password = ?" + data.password;
  conn.query("select * from user where email= ? and password= ?",[data.email,data.password],function(err,result,fields){x
    if(err) throw err;
    if(result.length > 0){
      console.log(result);
      res.redirect('/')
       }else{
      console.log("empty");
    }
  })
  
})

// 'users/register'
router.post('/register', function(req, res, next) {

  var data = {
    name : req.body.name,
    phone : req.body.mobile,
    email : req.body.email,
    password : req.body.pass
  }

  conn.query('insert into user set ?', data , function (err,result) {
    if(err) throw err;
    res.redirect('/login')
  })

  
});

// 'users/loggedin'
router.post('/loggedin', function(req, res, next) {
  var name = req.body.email;
  var password= req.body.password;
  console.log(name);

  res.render('loggedin',{ a:name,b:password });
});



module.exports = router;
