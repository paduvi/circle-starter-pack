/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (app) {

    let sample = app.db.sequelize.models.sample;

    return {
        findSample: function (msg, done) {
            return sample.findAndCountAll(msg.options).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        findSampleById: function (msg, done) {
            return sample.findById(msg.id).then(function (result) {
                done(null, result);
            }).catch(function (err) {
                done(err);
            });
        },

        createSample: function (msg, done) {
            return sample.create(msg.payload).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        updateSample: function (msg, done) {
            return sample.update(msg.payload, {
                where: {
                    id: msg.id
                }
            }).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        },

        deleteSample: function (msg, done) {
            return sample.destroy({
                where: {
                    id: msg.id
                }
            }).then(function (result) {
                return done(null, result);
            }).catch(function (err) {
                return done(err);
            })
        }
    }
};

