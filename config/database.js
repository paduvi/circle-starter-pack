/**
 * Created by chotoxautinh on 11/12/16.
 */

"use strict";

var MongoClient = require('mongodb').MongoClient;
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var glob = require('glob-promise');

module.exports = function (app) {
    return Promise.all([
        connectMongo(app),
        connectPostgres(app)
    ]).then(function (results) {
        return {
            mongo: results[0],
            postgres: results[1]
        }
    })
};

function connectMongo(app) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(`mongodb://${app.setting.db.mongo.host}/${app.setting.db.mongo.name}`, function (err, dbConnection) {
            if (err)
                return reject(err);
            resolve(dbConnection);
        });
    })
}

function connectPostgres(app) {
    return Promise.resolve().then(function () {
        return new Promise(function(resolve, reject){
            let db = new Sequelize(app.setting.db.postgres.database, app.setting.db.postgres.username, app.setting.db.postgres.password, app.setting.db.postgres);

            db.authenticate().then(function(){
                resolve(db);
            }).catch(function(error){
                if (error)
                    return reject(`\n${error.name}: ${error.message}\n`)
            });
        });

    })
}
