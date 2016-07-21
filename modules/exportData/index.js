'use strict';

var _ = require('lodash');

var csvExport = require('./csv');
var sqlExport = require('./sql');

module.exports = function (req, res, next) {
    var exportType = req.query.exportType || 'csv';
    if (req.unformatedData.length === 0) {
        res.status(500).send('Error: unformated data emty');
    }
    if (exportType === 'csv') {
        var separator = getSeparator(+req.query.csvSeparator || 1);
        req.exportedData = csvExport(req.unformatedData, separator);
        next();
    } else if (exportType === 'sql') {
        var params = {};
        params.tblName = req.query.tblName || 'tblName';
        params.createTable = req.query.createTable || false;
        params.columnNames = req.query.clmnNm || null;
        req.exportedData = sqlExport(req.unformatedData, params);
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