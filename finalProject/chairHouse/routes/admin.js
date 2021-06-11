var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mysql = require('mysql');
const { route } = require('./users');


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
    var c = req.cookies;
    
      // if(c){
      //   res.redirect('/admin/home')
      // }
      res.render('admin/admin',{cookie:req.cookies})
     
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
        res.render('admin/products',{data:db_rows,a:req.cookies.email.email})
      }
    })
    
  })



  router.get('/addproduct',function (req,res) {
    res.render('admin/add')
  })
  
  router.get('/demo',function (req,res) {
    res.render('admin/demo')
  })
  
 
  
  router.get('/update/:id',function (req,res) {
    var id = req.params.id;

    conn.query("select * from product where id=?",id,function (err,result) {
      if (err) throw err;
      res.render('admin/update',{data:result});
    })
    
  })

  router.get('/logout',function (req,res) {
    //res.clearCookie('email');
   res.redirect('/admin')
  })

  router.get('/delet/:id',function (req,res) {
    var id = req.params.id;

    conn.query('delete from product where id=?',id,function (err,result) {
      if(err) throw err;
      res.redirect('/admin/home')
    })
  })
  
module.exports = router;