'use strict';

var _ = require('lodash');

module.exports = function (input, params) {

    var tblName = _.trim(params.tblName, './');
    var result = {};
    result.contentType = 'text/plain';
    result.filename = 'export.sql';

    result.body = '';

    if (params.createTable) {
        result.body += getCreateTableQuery(input, tblName) + '\r\n \r\n';
    }

    result.body += getInsertQuery(input, tblName);

    return result;
};


function getCreateTableQuery(input, tblName) {
    var createQuery = 'CREATE TABLE `' + tblName + '` (';
    createQuery += _.map(input[0], function (value, key) {
            return '`' + key + '` text';
        }).join(',') + ');';

    return createQuery;
}

function getInsertQuery(input, tblName) {
    var insertQuery = 'INSERT INTO `' + tblName + '` (';
    insertQuery += _.map(input[0], function (value, key) {
        return '`' + key + '`';
    });
    insertQuery += ') VALUES (';

    insertQuery += _.map(input, function (el) {
            return _.map(el, function (value, key) {
                return clearValue(value);
            })
        }).join(') , \r\n (') + ');';

    return insertQuery;
}


// http://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
function clearValue(value) {
    if (Number.isInteger(value)) {
        return value;
    }
    value = '' + value;
    return '\'' + value.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char;
            }
        }) + '\'';
}