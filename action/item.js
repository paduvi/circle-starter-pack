/**
 * Created by hailp on 11/24/16.
 */

module.exports = function (app) {

    let item = app.db.sequelize.models.item;

    return {
        findItem: function (msg, done) {
            return item.findAndCountAll(msg.options).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        findItemById: function (msg, done) {
            return item.findById(msg.id).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        findItemOriginate: function (msg, done) {
            let script = require('../script/schema');
            let sequelize = app.db.sequelize;
            return sequelize.query(script.findOriginateById(msg.table_name, msg.id), {type: sequelize.QueryTypes.SELECT}).then(function (result) {
                if (result && result.length)
                    return done(null, result[0]);
                return done(null);
            }).catch(function (err) {
                return done(err);
            })
        }

    }

};