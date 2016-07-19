"use strict";

var express = require('express');
var router = express.Router();

router.get('/ping/',
    function (req, res, next) {
        res.status(200).send("pong!");
    });

module.exports = router;