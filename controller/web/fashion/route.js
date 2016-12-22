/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var fashionHandler = require('./handler/index')(application);
    return {
        "/": {
            get: {
                handler: fashionHandler.findItem,
            }
        },
        "/:id([0-9]+)": {
            get: {
                handler: fashionHandler.findItemById,
            },
            put: {
                handler: fashionHandler.updateItem,
            },
            delete: {
                handler: fashionHandler.deleteItem,
            }
        },
        "/create": {
            post: {
                handler: fashionHandler.createItem,
            }
        }
    }
};