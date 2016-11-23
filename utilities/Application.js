/**
 * Created by chotoxautinh on 11/12/16.
 */
var Promise = require('bluebird');
var fs = require('fs');
var database = require("../config/database.js");
var path = require('path');
var glob = require('glob-promise');
var zmq = require('zmq');
var http = require('http');
var express = require('express');

class Application {
    constructor(opts) {

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        global.__base = path.join(__dirname, "..");

        var app = express();

        // Swagger document loader
        if (opts && opts.enableSwagger) {

            if (process.env.NODE_ENV === 'development') {
                app.set('view cache', false);
                app.enable('verbose errors');
                app.set("showStackError", true);
            } else {
                app.locals.cache = 'memory';
                app.disabled('verbose errors');
                app.set('trust proxy', 1);
            }

            app.enable('trust proxy');
            app.use(express.static(__base + '/public', {maxAge: 3600}));
        }

        Object.assign(this, app);
        this.expressApp = function (req, res, next) {
            this.handle(req, res, next);
        }.bind(this);

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
            return self.loadMessageRoutes();
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
            return self.loadWebController();
        }).then(function () {
            return http.createServer(self.expressApp);
        }).then(function (server) {
            self.httpServer = server;

            server.listen(self.config.web.port, () => {
                console.log('Application loaded using the "' + process.env.NODE_ENV + '" environment configuration');
                console.log('Application started on port ' + self.config.web.port, ', Process ID: ' + process.pid);
            });

            // connect to publisher
            self.sub.connect(self.config.zmq.pub_address);
            console.log(`Connected to zmq publisher at ${self.config.zmq.pub_address}.`);
        }).catch(function (err) {
            console.error(err)
        });
    }

    connectDatabase() {
        return database(this);
    }

    loadMessageRoutes() {
        var self = this;
        this.messageRoute = {}
        return glob(`${__base}/controller/socket/**/route.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let controllerName = path.dirname(filePath).split("/").pop();
                let content = require(filePath)(self);
                Object.keys(content).forEach(function (route) {
                    if (!route.startsWith("/"))
                        route = "/" + route;
                    self.handleMessageRoute("/" + controllerName + route, content[route]);
                })
            });
        });
    }

    handleMessageRoute(route, handler) {
        this.messageRoute[route] = handler;
    }

    loadWebController() {
        var self = this;
        return glob(`${__base}/controller/web/**/route.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let controllerName = path.dirname(filePath).split("/").pop();
                let content = require(filePath)(self);
                Object.keys(content).forEach(function (route) {
                    if (!route.startsWith("/"))
                        route = "/" + route;
                    self.loadWebRoute(self.config.web.prefix + "/" + controllerName + route, content[route]);
                })
            });
        });
    }

    loadWebRoute(route, handlers) {
        var self = this;
        Object.keys(handlers).forEach(function (method) {
            let middleware = handlers[method].middleware;
            let handler = handlers[method].handler;
            self[method].call(self, route, middleware, handler);
        })
    }
}

module.exports = Application;