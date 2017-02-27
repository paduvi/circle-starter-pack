/**
 * Created by chotoxautinh on 11/12/16.
 */

/* Load Database connections */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const connection = mongoose.connect('mongodb://localhost/circle');

exports.beforeInitialize = (app) => {
    const models = {
        // postgres: sequelize,
        mongo: connection
    };
    return Promise.resolve().then(() => models);
};

/* Do something after loading models */
exports.afterInitialize = (app) => {
    return Promise.resolve();
}