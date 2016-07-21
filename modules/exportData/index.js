'use strict';

var _ = require('lodash');

var csvExport = require('./csv');

module.exports = function (req, res, next) {
    var exportType = req.query.exportType || 'csv';
    var separator = getSeparator(+req.query.csvSeparator || 1);
    if (exportType === 'csv') {
        req.exportedData = csvExport(req.unformatedData,separator);
        next();
    } else if (exportType === 'sql') {
        next();
    } else {
        res.status(400).send('Error: wrong export type');
    }
};

function getSeparator(separatorId) {
    switch (separatorId) {
        case 1:
            return ';';
            break;
        case 2:
            return '|';
            break;
        case 3:
            return '&';
            break;
        case 4:
            return ',';
            break;
        case 5:
            return '.';
            break;
        default:
            return ';';
            break;
    }
}