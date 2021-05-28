var http = require('http')
var fs = require('fs');

fs.writeFile('helloworld.html','<h1>hello world</h1>',function(err){
    if(err) throw err;
    console.log('saved!!');
})
fs.open('helloworld.html','w',function (err,file) {
    if(err) throw err;
    console.log('open!!');
})
fs.appendFile('helloworld.html','<p>this is a paragraph</p>',function(err){
    if(err) throw err;
    console.log('updated!!')
})
// fs.unlink('helloworld123.html',function(err){
//     if(err) throw err;
//     console.log('deleted!!');
// })
http.createServer(function (req,res) {
    fs.readFile('helloworld.html',function(err,data){
        res.writeHead(200,{'content-type':'text/html'});
        res.write(data);
        
        res.end();
    })
}).listen(4000)