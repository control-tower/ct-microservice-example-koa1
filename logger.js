'use strict';

var bunyan = require('bunyan');
/**
 * Create Logger
 */
module.exports = (function() {
    var streams = [{
        level: 'debug',
        stream: process.stdout
    }];
    var logger = bunyan.createLogger({
        name: 'microservice-koa1',
        streams: streams
    });
    return logger;

}());
