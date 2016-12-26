/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var itemHandler = require('./handler/index')(application);
    return {
        "/": {
            get: {
                handler: itemHandler.findItem,
            }
        },
        "/:id([0-9]+)": {
            get: {
                handler: itemHandler.findItemById,
            }
        }
    }
};