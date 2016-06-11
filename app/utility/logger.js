'use strict';

var winston = require('winston');

var config = {
    isDebug: false,
    logLevel: 'info'
};

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
        new winston.transports.DailyRotateFile({
            name: 'file',
            level: config.isDebug ? config.logLevel : 'info',
            json: false,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            datePattern: '.yyyy-MM-dd.log',
            maxsize: 1024 * 1024 * 10,
            filename: './logfiles/log',
            timestamp: function () { return (new Date()); }
        })
    ]
});
winston.addColors(customColors);

module.exports = logger;
