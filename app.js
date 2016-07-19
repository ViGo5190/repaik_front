var express = require('express');
var config = require('./config/index.js');
var http = require('http');

var app = express();
require('./boot')(app);

http
    .createServer(app)
    .listen(config.port);

console.log('Run server localhost:' + config.port);