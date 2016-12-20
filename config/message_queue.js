/**
 * Created by chotoxautinh on 12/20/16.
 */
var Promise = require('bluebird');
var zmq = require('zmq');

module.exports = function (app) {
    return Promise.resolve().then(function () {
        let sub = zmq.socket('sub'); // create subscriber endpoint
        let logger = app.helpers.logger;
        let prefix = app.setting.mq.sub_prefix;
        sub.subscribe(prefix);

        // connect to publisher
        sub.connect(app.setting.mq.pub_address);
        logger.info(`Connected to zmq publisher at ${app.setting.mq.pub_address}.`);
        return sub;
    })
};
