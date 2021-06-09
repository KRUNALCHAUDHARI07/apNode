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



router.get('/register',function(req,res){
  res.end('register')
})

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
module.exports = router;
