/**
 * Created by chotoxautinh on 11/12/16.
 */
var MongoClient = require('mongodb').MongoClient;
var Promise = require('bluebird');

module.exports = function (app) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(`mongodb://${app.config.db.host}/${app.config.db.name}`, function (err, dbConnection) {
            if (err)
                return reject(err);
            resolve(dbConnection);
        });
    })
}
