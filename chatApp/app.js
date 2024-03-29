const express =require('express');
const app = express();
const http = require('http');
const server= http.createServer(app);
const { Server } = require('socket.io');
 const io = new Server(server);


app.get('/',(req,res) => {
    res.sendFile(__dirname+'/app.html')
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message' , msg)
    });
  });

server.listen(3000, () => console.log('server is running on 3000'))