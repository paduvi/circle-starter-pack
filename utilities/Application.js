/**
 * Created by chotoxautinh on 11/12/16.
 */
var Promise = require('bluebird');
var path = require('path');

class Application {
    constructor() {
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        global.__base = path.join(__dirname, "..");
        this.getGlobalConfig();
    }

    getGlobalConfig() {
        this.config = require(__base + "/config/config.js");
        Object.assign(this.config, require(__base + `/config/env/${process.env.NODE_ENV}.js`));
    }

    start() {
        var self = this;
        return Promise.resolve().then(function () {
            return self.connectDatabase();
        }).then(function (db) {
            self.db = db;
        })
    }

    connectDatabase() {
        return require(__base + "/config/database.js")(this);
    }
}

module.exports = Application;