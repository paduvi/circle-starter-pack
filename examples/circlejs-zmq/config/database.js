/**
 * Created by chotoxautinh on 11/12/16.
 */

"use strict";

var Sequelize = require('sequelize');
var Promise = require('bluebird');
let schemaScript = require('../script/schema');

exports.beforeInitialize = function (app) {
    return connectPostgres(app);
};

exports.afterInitialize = function (app) {
    return Promise.map(Object.keys(app.db.sequelize.models), function (modelName) {
        let model = app.db.sequelize.models[modelName];
        return model.sync();
    }).then(function () {
        return Promise.all([
            app.db.sequelize.query(schemaScript.inherit('item.book', 'item.item')),
            app.db.sequelize.query(schemaScript.inherit('item.electronic', 'item.item')),
            app.db.sequelize.query(schemaScript.inherit('item.fashion', 'item.item')),
            app.db.sequelize.query(schemaScript.inherit('item.service', 'item.item')),
        ]);
    });
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
