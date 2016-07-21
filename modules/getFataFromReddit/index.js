'use strict';

var Repaik = require('repaik');
var Promise = require('bluebird');
var reformate = require('./reformate');

var repaik = new Repaik();
module.exports = function (req, res, next) {

    var taskId = +req.query.task || 1;

    repaik.request('http://www.reddit.com/r/javascript/.json')
        .then((redditJson) => {
            if (taskId === 1) {
                return task1(redditJson, req.query);
            } else if (taskId === 2) {
                return task2(redditJson, req.query);
            } else {
                throw new Error('unknow task');
            }

        })
        .then((data) => {
            req.unformatedData = data;
            next();
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("smtg wrng!");
        });
};

function task1(redditJson, query) {
    return new Promise(function (resolve, reject) {
        var order = query.orderBy || 'domain';
        var orderDirection = query.orderDirection || 'asc';

        order = (orderDirection === 'desc' ? '-' : '') + order;
        var data = redditJson
            .reformateData(reformate.inputData)
            .orderBy(order)
            .reformateData(reformate.orderedData)
            .getData();
        resolve(data);
    });
}

function task2(redditJson, query) {
    return new Promise(function (resolve, reject) {
        var order = '-articles count';
        var data = redditJson
            .reformateData(reformate.inputData)
            .groupBy('domain')
            .reformateData(reformate.groupedData)
            .orderBy(order)
            .getData();

        resolve(data);
    });
}