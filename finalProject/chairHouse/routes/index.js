var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'chairhouse'
})

conn.connect(function (err) {
  if(err) throw err;
  console.log('db connected');
})



/* GET home page. */
router.get('/', function(req, res, next) {

  
  res.render('index', { title: 'Express' });
});




router.get('/item',function (req,res) {
  conn.query("select * from product",function (err,db_rows) {
    if (err) {
      console.log(err);
    }else{
      
      var a=1
      console.log(db_rows);
      res.render('items',{data:db_rows,a:a})
    }
  })
 
})

router.get('/buynow/:id',function (req,res) {
  var id = req.params.id;
  conn.query("select * from product where id=?",id,function (err,result) {
    if(err) throw err;
    console.log(result);
    res.render('buy',{result:result})
  })
 
})

router.get('/login',function(req,res){
  res.render('login')
})

router.get('/register',function (req,res) {
  res.render('register')
})

module.exports = router;