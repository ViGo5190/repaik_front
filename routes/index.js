"use strict";

var express = require('express');
var router = express.Router();

var getData = require('../modules/getFataFromReddit');
var exportData = require('../modules/exportData');

router.get('/ping/',
    function (req, res, next) {
        res.status(200).send("pong!");
    });


router.get('/',
    function (req, res, next) {
        res.render('pages/main.ejs', {});
    });


router.get('/getdata/',
    getData,
    exportData,
    function (req, res, next) {
        if (!req.exportedData) {
            res.status(500).send("smtg wrngs!");
        } else {
            res
                .header('Content-disposition', 'attachment; filename=' + req.exportedData.filename)
                .header("Content-Type", req.exportedData.contentType)
                .send(req.exportedData.body);
        }
    });

module.exports = router;