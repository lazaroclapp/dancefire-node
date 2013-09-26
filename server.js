//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var force = 0;

router.use(express.bodyParser());

router.post('/android', function(req, res){
    io.sockets.emit('force', req.body.force);
    console.log('Force: ' + req.body.force);
    res.send('');
});

router.use(express.static(path.resolve(__dirname, 'client')));

io.sockets.on('connection', function (socket) {
  console.log('\ngot a new connection from: ' + socket.id + '\n');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
