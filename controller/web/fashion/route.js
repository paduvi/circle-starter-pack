/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var fashionHandler = require('./handler/index')(application);
    return {
        "/test": {
            get: {
                handler: function (req, res) {
                    res.json(req.user);
                },
                middleware: [],
                authenticate: {
                    name: 'jwt',
                    permissions: ['fashion_manage_all'],
                    // options: {}
                },
                cors: 'chotoxautinh.com'
            }
        },
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