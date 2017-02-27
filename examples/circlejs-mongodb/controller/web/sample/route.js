/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = (application) => {
    const sampleHandler = require('./handler')(application);

    return {
        "/": {
            get: {
                handler: sampleHandler.findSample,
            }
        },
        "/:id": {
            get: {
                handler: sampleHandler.findSampleById,
            },
            put: {
                handler: sampleHandler.updateSample,
            },
            delete: {
                handler: sampleHandler.deleteSample,
            }
        },
        "/create": {
            post: {
                handler: sampleHandler.createSample,
            }
        },
        "/cors/:id([0-9]+)": {
            get: {
                handler: sampleHandler.findSampleById,
                middleware: [], // optional
                cors: 'chotoxautinh.com'
            }
        },
        "/auth/test": {
            get: {
                handler: function (req, res) {
                    res.json(req.user);
                },
                authenticate: {
                    name: 'jwt',
                    permissions: ['item_manage'],
                    // options: {}
                },
            }
        },
    }
};