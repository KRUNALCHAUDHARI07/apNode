var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
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

router.get('/',function (req,res) {
    res.render('admin/admin')
  })

  router.get('/register',function(req,res){
    res.render('admin/register')
  })


  router.get('/home',function (req,res) {
    
    conn.query("select * from product",function (err,db_rows) {
      if (err) {
        console.log(err);
      }else{
        
        var a=1
        console.log(db_rows);
        res.render('admin/products',{data:db_rows,a:a})
      }
    })
    
  })



  router.get('/addproduct',function (req,res) {
    res.render('admin/add')
  })
  
  router.get('/demo',function (req,res) {
    res.render('admin/demo')
  })
  
  
module.exports = router;