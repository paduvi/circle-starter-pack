/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (app) {

    let fashion = app.db.sequelize.models.fashion;

    return {
        getItem: function (options) {
            return fashion.findAndCountAll(options);
        },

        getItemById: function (id) {
            return fashion.findById(id);
        },

        createItem: function (payload) {
            return fashion.create(payload);
        },

        updateItem: function (payload, id) {
            return fashion.update(payload, {
                where: {
                    id: id
                }
            });
        },

        deleteItem: function (id) {
            return fashion.destroy({
                where: {
                    id: id
                }
            });
        }
    }
};

