'use strict';

var util = require('util');
var imguri = require('imguri');

module.exports = function (file, cb) {
    if (!file || !file.path) {
        return cb(new Error('no file path found!'));
    }

    var options = {
        force: true
    };

    imguri.encode(file.path, options, encoded);

    function encoded(err, result) {
        if (err || !result || !result[file.path] || result[file.path].err) {
            return cb(err || new Error('error encoding file to imguri'));
        }

        file.data = result[file.path].data;
        cb(undefined, file);
    }
};
