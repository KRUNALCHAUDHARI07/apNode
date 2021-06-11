var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer')
var path = require('path')


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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 'users/login'
router.post('/login',function (req,res,next) {
  
  var data = {
    email : req.body.email,
    password : req.body.pass
  }

  console.log(data);

  conn.query('select * from users where email= ? and password = ?',[data.email,data.password],function (err,result,fields) {
    if (err) throw err;
    if(result.length > 0){
      res.cookie('email',data)
      console.log(req.cookies);
      res.redirect('/admin/home');
      // res.send(req.cookies.email.email)
    }else{
      res.end('wrong5')
    }
  })
})


// 'users/register'
router.post('/register', function(req, res, next) {

  var data = {
     name : req.body.name,
     email : req.body.email,
     address : req.body.address,
     password : req.body.pass,
     
  }
  var pass = req.body.pass
  var c_pass = req.body.c_pass
  console.log(data);
  if (data.password == c_pass) {
   
    const sql = 'insert into users set ?'
    conn.query(sql,data,function(err,result){
      if(err) {
        console.log('not');
      }else{
        console.log('yes');
      }
      res.redirect('/admin');
    })
   
  }else{
    console.log('not');
    res.end('<h1>not same password</h1>')
  }
  
// res.redirect('/')
  
});

//


 //Set Storage Engine
const storage = multer.diskStorage({
	destination:'./public/images/uploads/',
	filename: function(req,file,cb){
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

// initialize upload
const upload = multer({
	storage:storage
}).single('p_img')

  
  router.post('/addProduct',upload,function (req,res,next) {
   

    var data = {product_img: req.file.filename,
              product_name : req.body.pname,
              product_desc : req.body.pdisc,
              product_price: req.body.price
            }

    conn.query("insert into product set ?",data,function (err,result) {
      if (err) {
        res.end('not inserted');
      }
      else{
        
        res.redirect('/admin/home')
      }
    })
    
  })


  router.post('/updateProduct/:id',upload,function (req,res,next) {
    var id = req.params.id;

    var data = {
      product_img: req.file.filename,
      product_name : req.body.pname,
      product_desc : req.body.pdisc,
      product_price: req.body.price
            }

    conn.query(`update product set? where id=${id}`,data,function (err,result) {
      if (err) {
        res.end('not inserted');
      }
      else{
        
        res.redirect('/admin/home')
      }
    })
    
  })
// 'users/login'
router.post('/userlogin',function (req,res,next) {
  
  var data = {
    email : req.body.email,
    password : req.body.pass
  }

  console.log(data);

  conn.query('select * from users where email= ? and password = ? and flag=1',[data.email,data.password],function (err,result,fields) {
    if(result.length > 0){
      res.cookie('email',data.email)
      res.redirect('/');

    }else{
      res.end('wrong5')
    }
  })
})  


// 'users/register'
router.post('/userregister', function(req, res, next) {

  var data = {
     name : req.body.name,
     email : req.body.email,
     address : req.body.address,
     password : req.body.pass,
     flag:1
     
  }
 
  var c_pass = req.body.c_pass
  console.log(data);
  if (data.password == c_pass) {
   
    const sql = 'insert into users set ?'
    conn.query(sql,data,function(err,result){
      if(err) {
        console.log('not');
      }else{
        console.log('yes');
      }
      res.redirect('/admin');
    })
   
  }else{
    console.log('not');
    res.end('<h1>not same password</h1>')
  }
  
// res.redirect('/')
  
});

module.exports = router;
