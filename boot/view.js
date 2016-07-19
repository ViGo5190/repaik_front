'use strict';
var ejs = require('ejs');
var config = require('../config/index.js');

var engine = require('ejs-locals');


module.exports = function(app) {
    app.engine('ejs', engine);
    app.set('views', config.viewPath);
    app.set('view engine', 'ejs');
};