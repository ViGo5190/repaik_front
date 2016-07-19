'use strict';
if (!__dirname) {
    var __dirname = require('fs').workingDirectory;
}

module.exports = {
    // environment
    domain: 'localhost',
    port: 8888,
    staticPath: __dirname + '/../public',
    viewPath: __dirname + '/../views'
};