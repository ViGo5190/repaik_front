'use strict';

var config = require('../config/index.js');

// var parseurl = require('parseurl');
var bodyParser = require('body-parser');

var routesIndex = require('../routes/');
var routesApi = require('../routes/api');

module.exports = function (app) {

    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    require('./view')(app);

    app.use('/', require('express').static(config.staticPath));

    app.use(function (req, res, next) {
        if (req.method !== 'GET') {
            next();
            return;
        }

        if (req.path.substr(-1) !== '/') {
            var query = req.url.slice(req.path.length);
            res.redirect(302, req.path + '/' + query);
        } else {
            next();
        }
    });

    app.use('/', routesIndex);
    app.use('/api/', routesApi);

};
