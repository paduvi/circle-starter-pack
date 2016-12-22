/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (app) {

    let sample = app.db.sequelize.models.sample;

    return {
        getSample: function (options) {
            return sample.findAndCountAll(options);
        },

        getSampleById: function (id) {
            return sample.findById(id);
        },

        createSample: function (payload) {
            return sample.create(payload);
        },

        updateSample: function (payload, id) {
            return sample.update(payload, {
                where: {
                    id: id
                }
            });
        },

        deleteSample: function (id) {
            return sample.destroy({
                where: {
                    id: id
                }
            });
        }
    }
};

