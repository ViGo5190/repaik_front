'use strict';

var _ = require('lodash');

var inputData = function (data) {
    return _.map(data.data.children, function (article) {
        return article.data;
    });
};

var orderedData = function (data) {
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

var groupedData = function (data) {
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

module.exports = {
    inputData,
    orderedData,
    groupedData
};