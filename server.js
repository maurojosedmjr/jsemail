var http = require('http');
var app = require('./app')

var server = http.createServer(app.handleRequest).listen(8000);
