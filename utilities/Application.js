/**
 * Created by chotoxautinh on 11/12/16.
 */
var Promise = require('bluebird');
var fs = require('fs');
var database = require("../config/database.js");
var mq = require('../config/message_queue');
var path = require('path');
var glob = require('glob-promise');
var zmq = require('zmq');
var http = require('http');
var express = require('express');

class Application {
    constructor() {

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        global.__base = path.join(__dirname, "..");

        var app = express();


        Object.assign(this, app);
        this.expressApp = function (req, res, next) {
            this.handle(req, res, next);
        }.bind(this);

        this.getGlobalConfig();
        this.getGlobalSetting();
        this.useExpressSetting();
    }

    getGlobalConfig() {
        this.config = require(__base + "/config/config.js");
        try {
            fs.accessSync(`${__base}/config/env/config-${process.env.NODE_ENV}.js`, fs.F_OK);
            Object.assign(this.config, require(`${__base}/config/env/config-${process.env.NODE_ENV}.js`));
        } catch (e) {
            // It isn't accessible
        }
    }

    getGlobalSetting() {
        this.setting = require(__base + "/config/setting.js");
        try {
            fs.accessSync(`${__base}/config/env/setting-${process.env.NODE_ENV}.js`, fs.F_OK);
            Object.assign(this.setting, require(`${__base}/config/env/setting-${process.env.NODE_ENV}.js`));
        } catch (e) {
            // It isn't accessible
        }
    }

    useExpressSetting() {
        let expressFunction = require(`${__base}/config/express.js`);
        expressFunction(this);
    }

    loadHelpers() {
        var self = this;
        return glob(`${__base}/utilities/helpers/*.js`).then(function (files) {
            let helpers = {};
            files.map(function (filePath) {
                let filename = path.basename(filePath, '.js');
                helpers[filename] = require(filePath);
            });
            Object.assign(self, {helpers: helpers});
            return;
        });
    }

    start() {
        var self = this;
        return Promise.resolve().then(function () {
            return self.loadHelpers();
        }).then(function () {
            return self.connectDatabase();
        }).then(function (db) {
            let dbList = Object.keys(db);
            if (dbList.length) {
                dbList.forEach(function (dbName) {
                    db[dbName].models = {}
                });
            } else {
                db.models = {}
            }
            self.db = db;
            return self.loadModels();
        }).then(function () {
            if (!self.setting.mq)
                return;
            return self.connectMessageQueue()
                .then(function (mq) {
                    self.sub = mq;
                    return self.loadMessageRoutes();
                })
                .then(function () {
                    let prefix = self.setting.mq.sub_prefix;
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
                    return;
                })
        }).then(function () {
            return self.loadWebController();
        }).then(function () {
            return http.createServer(self.expressApp);
        }).then(function (server) {
            self.httpServer = server;
            let logger = self.helpers.logger;

            server.listen(self.setting.web.port, () => {
                logger.info('Application loaded using the "' + process.env.NODE_ENV + '" environment configuration');
                logger.info('Application started on port ' + self.setting.web.port, ', Process ID: ' + process.pid);
            });

            return;
        }).catch(function (err) {
            console.error(err)
        });
    }

    connectDatabase() {
        return database(this);
    }

    connectMessageQueue() {
        return mq(this);
    }

    loadModels() {
        var self = this;
        let dbList = Object.keys(this.db);
        if (dbList.length) {
            return glob(`${__base}/models/{${dbList.join(",")}}/*.js`).then(function (files) {
                return Promise.map(files, function (filePath) {
                    let dbName = path.dirname(filePath).split("/").pop();
                    let modelName = path.basename(filePath, '.js');
                    let content = require(filePath)(self.db[dbName]);
                    self.db[dbName].models[modelName] = content;
                    return;
                });
            });
        }
        return glob(`${__base}/models/*.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let modelName = path.basename(filePath, '.js');
                let content = require(filePath)(self.db);
                self.db.models[modelName] = content;
                return;
            });
        });
    }

    loadMessageRoutes() {
        var self = this;
        this.messageRoute = {}
        return glob(`${__base}/controller/socket/*/route.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let controllerName = path.dirname(filePath).split("/").pop();
                let content = require(filePath)(self);
                Object.keys(content).forEach(function (route) {
                    if (!route.startsWith("/"))
                        route = "/" + route;
                    self.handleMessageRoute("/" + controllerName + route, content[route]);
                });
                return;
            });
        });
    }

    handleMessageRoute(route, handler) {
        this.messageRoute[route] = handler;
    }

    loadWebController() {
        var self = this;
        return glob(`${__base}/controller/web/*/route.js`).then(function (files) {
            return Promise.map(files, function (filePath) {
                let controllerName = path.dirname(filePath).split("/").pop();
                let content = require(filePath)(self);
                return Promise.map(Object.keys(content), function (route) {
                    if (!route.startsWith("/"))
                        route = "/" + route;
                    let prefix = self.setting.web.prefix || '';
                    return self.loadWebRoute(prefix + "/" + controllerName + route, content[route]);
                })
            });
        });
    }

    loadWebRoute(route, handlers) {
        var self = this;
        return Promise.map(Object.keys(handlers), function (method) {
            let middleware = handlers[method].middleware || [];
            let handler = handlers[method].handler;
            let cors = handlers[method].cors;
            if (cors && process.env.NODE_ENV != 'development') {
                let filter = function (req, res, next) {
                    let ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
                    if (cors.constructor === Array) {
                        return Promise.map(cors, function (allow_origin) {
                            return self.helpers.ipUtils.isAllowed(ip, allow_origin);
                        }).then(function (results) {
                            if (~results.indexOf(true))
                                return next();
                            return res.sendStatus(403);
                        });
                    }
                    return self.helpers.ipUtils.isAllowed(ip, cors).then(function (result) {
                        if (result)
                            return next()
                        return res.sendStatus(403);
                    })
                }
                middleware.unshift(filter);
            }
            self[method](route, ...middleware, handler);
            return;
        })
    }
}

module.exports = Application;