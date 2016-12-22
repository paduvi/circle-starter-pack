/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var sampleHandler = require('./handler/index')(application);
    return {
        "/": {
            get: {
                handler: sampleHandler.findSample,
            }
        },
        "/:id([0-9]+)": {
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
        "/cors/:id([0-9]+)": {
            get: {
                handler: sampleHandler.findSampleById,
                middleware: [], // optional
                cors: '113.190.102.155'
            }
        },
        "/create": {
            post: {
                handler: sampleHandler.createSample,
            }
        }
    }
};