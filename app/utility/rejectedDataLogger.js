'use strict';

var winston = require('winston');

// Set up logger
var customColors = {
    debug: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

var logger = new (winston.Logger)({
    colors: customColors,
    levels: {
        debug: 0,
        info: 1,
        warn: 3,
        error: 4
    },
    transports: [
        new (winston.transports.File)({
            name: 'rejected-data-file',
            filename: './logfiles/rejected-data.log',
            level: 'error'
        })
    ]
});
winston.addColors(customColors);

module.exports = logger;
