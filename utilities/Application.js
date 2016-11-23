/**
 * Created by chotoxautinh on 11/12/16.
 */
var Promise = require('bluebird');
var fs = require('fs');
var database = require("../config/database.js");
var path = require('path');
var glob = require('glob-promise');
var zmq = require('zmq');

class Application {
    constructor() {
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        global.__base = path.join(__dirname, "..");
        this.getGlobalConfig();
    }

    getGlobalConfig() {
        this.config = require(__base + "/config/config.js");
        try {
            fs.accessSync(`${__base}/config/env/${process.env.NODE_ENV}.js`, fs.F_OK);
            Object.assign(this.config, require(`${__base}/config/env/${process.env.NODE_ENV}.js`));
        } catch (e) {
            // It isn't accessible
        }
    }

    start() {
        var self = this;
        return Promise.resolve().then(function () {
            return self.connectDatabase();
        }).then(function (db) {
            self.db = db;
            self.sub = zmq.socket('sub'); // create subscriber endpoint
            return self.loadMessageRouting();
        }).then(function () {
            let prefix = self.config.zmq.sub_prefix;
            self.sub.subscribe(prefix);
            self.sub.on('message', function (data) {
                data = data.toString("utf8");
                if (!data.startsWith(prefix))
                    return;
                data = data.replace(new RegExp("^(" + prefix + ")"), "");
                try {
                    let message = JSON.parse(data);
                    let from = message.from;
                    let type = message.payload.type;
                    let route = "/" + from + "/" + type;
                    let handler = self.messageRoute[route];
                    if (!handler)
                        throw new Error("Route không tồn tại");
                    handler(message);
                } catch (err) {
                    return console.error(err);
                }
            });
        }).then(function () {
            // connect to publisher
            let pubAddress = "tcp://localhost:3000";
            self.sub.connect(pubAddress);
            console.log(`Connected to zmq publisher at ${pubAddress}.`);
        })
    }

    connectDatabase() {
        return database(this);
    }

    loadMessageRouting() {
        var self = this;
        this.messageRoute = {}
        return glob(`${__base}/controller/socket/**/route.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let controllerName = path.dirname(filePath).split("/").pop();
                let content = require(filePath)(self);
                Object.keys(content).forEach(function (route) {
                    if (!route.startsWith("/"))
                        route = "/" + route;
                    self.loadRoute("/" + controllerName + route, content[route]);
                })
            });
        });
    }

    loadRoute(route, handler) {
        this.messageRoute[route] = handler;
    }

}

module.exports = Application;