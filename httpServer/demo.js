var http = require('http')
var url = require('url')
http.createServer((req,res)=>{
    res.writeHead(200,"text/html")
    var q = url.parse(req.url,true).query;
    var txt= q.name + " is the person"
    res.write("<h1>"+txt+"</h1>")
    console.log('server is started on 4000');
    res.end();
}).listen(4000)