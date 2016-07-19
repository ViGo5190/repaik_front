"use strict";

var express = require('express');
var router = express.Router();
var Repaik = require('repaik');
var repaik = new Repaik();
var _ = require('lodash');

var reformatDataInputData = function (data) {
    return _.map(data.data.children, function (article) {
        return article.data;
    });
};

var reformatDataOrderedData = function (data) {
    return _.map(data, function (el) {
        return {
            id: el.id,
            title: el.title,
            'utc creation date': el.created_utc,
            score: el.score,
            domain: el.domain
        };
    });
};

var reformatDataGroupedData = function (data) {
    return _.map(data, function (el, key) {
        let scoreSumm = _.reduce(el, function (sum, curEl) {
            return sum + curEl.score;
        }, 0);
        return {
            domain: key,
            'articles count': el.length,
            'score summ': scoreSumm
        };
    });
};

router.get('/ping/',
    function (req, res, next) {
        res.status(200).send("pong!");
    });


router.get('/',
    function (req, res, next) {
        res.render('pages/main.ejs', {});
    });


router.get('/getdata/',
    function (req, res, next) {
        console.log(req.query);
        var exportType = req.query.exportType || 'csv';
        repaik.request('http://www.reddit.com/r/javascript/.json')
            .then((redditJson) => {
                if (exportType==='csv') {
                    var data = redditJson
                        .reformateData(reformatDataInputData)
                        .orderBy('domain')
                        .reformateData(reformatDataOrderedData)
                        .getData();
                    res.send(data);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("smtg wrng!");
            });
    });

module.exports = router;