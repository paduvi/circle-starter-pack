/**
 * Created by chotoxautinh on 11/12/16.
 */

"use strict";

// var MongoClient = require('mongodb').MongoClient;
var Sequelize = require('sequelize');
var Promise = require('bluebird');

module.exports = function (app) {
    return connectPostgres(app);
};

function connectPostgres(app) {
    return Promise.resolve().then(function () {
        let db = new Sequelize(app.setting.db.postgres.database, app.setting.db.postgres.username, app.setting.db.postgres.password, app.setting.db.postgres);

        return db.authenticate().then(function () {
            return {sequelize: db};
        }).catch(function (error) {
            if (error)
                return reject(`\n${error.name}: ${error.message}\n`)
        });
    })
}
