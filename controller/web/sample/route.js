/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var sample = require('./action/index')(application);
    return {
        "/get": {
            get: {
                handler: sample.getSample,
            }
        },
        "/get/:id([0-9]+)": {
            get: {
                handler: sample.getSampleById,
            }
        },
        "/get-cors/:id([0-9]+)": {
            get: {
                handler: sample.getSampleById,
                middleware: [], // optional
                cors: '113.190.102.155'
            }
        },
        "/create": {
            post: {
                handler: sample.createSample,
            }
        },
        "/update/:id([0-9]+)": {
            put: {
                handler: sample.updateSample,
            }
        },
        "/delete/:id([0-9]+)": {
            delete: {
                handler: sample.deleteSample,
            }
        }
    }
};