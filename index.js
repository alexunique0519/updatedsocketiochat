var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
     io = require('socket.io')(server),
    _ = require('underscore');
    
    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

   

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});


io.on('connection', function (socket) {
  // when the client emits 'receive message', this listens and executes
  socket.on('receive message', function (data) {
      var oOut = {
          from: _.escape(data.from),
          message: _.escape(data.message)
      };
      socket.broadcast.emit("receive message", oOut);
  });
});

app.use(express.static(__dirname + '/www/'));
