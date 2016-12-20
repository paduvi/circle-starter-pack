/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var fashionAction = require('./action/fashion')(application);
    return {
        "/get": {
            get: {
                handler: fashionAction.getItem,
            }
        },
        "/get-cors": {
            get: {
                handler: fashionAction.getItem,
                cors: '113.190.102.155'
            }
        },
        "/get/:fashion_id": {
            get: {
                handler: fashionAction.getItemById,
            }
        },
        "/create": {
            post: {
                handler: fashionAction.createItem,
            }
        },
        "/update/:fashion_id": {
            put: {
                handler: fashionAction.updateItem,
            }
        },
        "/delete/:fashion_id": {
            delete: {
                handler: fashionAction.deleteItem,
            }
        }
    }
};