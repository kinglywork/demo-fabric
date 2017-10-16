var express = require('express');
var app = express();
var http = require('http');

var httpServer = http.createServer(app);
var PORT = 18080;


app.use(express.static('public'));

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
