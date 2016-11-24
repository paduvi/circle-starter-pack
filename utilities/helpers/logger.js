/**
 * Created by chotoxautinh on 11/24/16.
 */
var winston = require('winston');

const tsFormat = function () {
    var timestamp = new Date();
    var date = ((timestamp.getDate() < 10) ? "0" : "") + timestamp.getDate();
    var month = ((timestamp.getMonth() < 9) ? "0" : "") + (timestamp.getMonth() + 1);
    var year = timestamp.getFullYear();
    var hour = ((timestamp.getHours() < 10) ? "0" : "") + timestamp.getHours();
    var minute = ((timestamp.getMinutes() < 10) ? "0" : "") + timestamp.getMinutes();

    return `${date}/${month}/${year} ${hour}:${minute}'`;
}
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: false
        }),
        new (winston.transports.File)({
            json: true,
            filename: `${__base}/log/server.log`,
            maxsize: 1024 * 1024 * 10, // 10MB
            timestamp: tsFormat,
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            name: "default-log"
        }),
        new (winston.transports.File)({
            json: true,
            filename: `${__base}/log/error.log`,
            maxsize: 1024 * 1024 * 10, // 10MB
            timestamp: tsFormat,
            level: 'error',
            name: "error-log"
        }),
        new winston.transports.File({
            json: true,
            level: "warn",
            filename: `${__base}/log/warning.log`,
            timestamp: tsFormat,
            maxsize: 1024 * 1024 * 10, // 10MB
            name: "warning-log"
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            json: true,
            filename: `${__base}/log/exception.log`,
            timestamp: tsFormat,
            maxsize: 1024 * 1024 * 10, // 10MB
        }),
        new winston.transports.Console({
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: false
        })
    ]
});

module.exports = logger;