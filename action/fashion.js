/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (app) {

    let fashion = app.db.sequelize.models.fashion;

    return {
        findItem: function (msg, done) {
            return fashion.findAndCountAll(msg.options).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        findItemById: function (msg, done) {
            return fashion.findById(msg.id).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        createItem: function (msg, done) {
            return fashion.create(msg.payload).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        updateItem: function (msg, done) {
            return fashion.update(msg.payload, {
                where: {
                    id: msg.id
                }
            }).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            });
        },

        deleteItem: function (msg, done) {
            return fashion.destroy({
                where: {
                    id: msg.id
                }
            }).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            });
        }
    }

};

