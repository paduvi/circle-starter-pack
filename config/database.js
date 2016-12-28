/**
 * Created by chotoxautinh on 11/12/16.
 */

"use strict";

var Sequelize = require('sequelize');
var Promise = require('bluebird');

exports.beforeInitialize = function (app) {
    return connectPostgres(app);
};

exports.afterInitialize = function (app) {
    return;
}

function connectPostgres(app) {
    return Promise.resolve().then(function () {
        let sequelize = new Sequelize(app.setting.db.postgres.database, app.setting.db.postgres.username,
            app.setting.db.postgres.password, app.setting.db.postgres);

        return sequelize.authenticate().then(function () {
            let script = require('../script/schema');
            return Promise.all([
                sequelize.query(script.createSchema('sample')),
                sequelize.query(script.createFlakeIdGenerator('item', 1))
            ]);

        }).then(function () {
            return {sequelize};
        });
    })
}
