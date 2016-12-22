/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var fashionAction = require('./action/index')(application);
    return {
        "/get": {
            get: {
                handler: fashionAction.getItem,
            }
        },
        "/get/:id([0-9]+)": {
            get: {
                handler: fashionAction.getItemById,
            }
        },
        "/create": {
            post: {
                handler: fashionAction.createItem,
            }
        },
        "/update/:id([0-9]+)": {
            put: {
                handler: fashionAction.updateItem,
            }
        },
        "/delete/:id([0-9]+)": {
            delete: {
                handler: fashionAction.deleteItem,
            }
        }
    }
};