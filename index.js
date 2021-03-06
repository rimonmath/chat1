var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, './', 'index.html'));
});
 
// Register events on socket connection
io.on('connection', function(socket){ 
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user, mmm){    
    io.emit('notifyUser', user, mmm);
  });
});
 
// Listen application request on port 3000
// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

var port =  process.env.OPENSHIFT_NODEJS_PORT || 8080;   // Port 8080 if you run locally
var address =  process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"; // Listening to localhost if you run locally
app.listen(port, address);
