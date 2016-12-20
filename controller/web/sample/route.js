/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var sample = require('./action/sample')(application);
    return {
        "/get": {
            get: {
                handler: sample.getItem,
            }
        },
        "/get/:sample_id": {
            get: {
                handler: sample.getItemById,
            }
        },
        "/create": {
            post: {
                handler: sample.createItem,
                middleware: [], // optional
                cors: "14.177.9.185" //optional
            }
        },
        "/update/:sample_id": {
            put: {
                handler: sample.updateItem,
            }
        },
        "/delete/:sample_id": {
            delete: {
                handler: sample.deleteItem,
            }
        }
    }
};