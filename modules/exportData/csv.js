'use strict';

var _ = require('lodash');

module.exports = function (input, separator) {
    var result = {};
    result.contentType = 'text/csv';
    result.filename = 'export.csv';
    result.body = '';
    _.forEach(input, function (el) {
        result.body += _.map(el, function (value, key) {
                if (_.includes(value, separator)) {
                    return '"' + value + '"';
                }
                return value;
            }).join(separator) + '\r\n';

    });
    return result;
};