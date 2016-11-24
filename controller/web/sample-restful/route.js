/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (application) {
    var sample = require('./action/sample')(application);
    return {
        "/sample-get": {
            get: {
                handler: sample.getSample,
                middleware: [],
                cors: ''
            }
        },
        "/sample-get/:sample_id": {
            get: {
                handler: sample.getSampleById,
                middleware: [],
                cors: ''
            }
        },
        "/sample-create": {
            post: {
                handler: sample.createSample,
                middleware: [], // optional
                cors: "14.177.9.185" //optional
            }
        },
        "/sample-update/:sample_id": {
            put: {
                handler: sample.updateSample,
                middleware: [],
                cors: ''
            }
        },
        "/sample-delete/:sample_id": {
            delete: {
                handler: sample.deleteSample,
                middleware: [],
                cors: ''
            }
        }
    }
};