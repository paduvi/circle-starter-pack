/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = function (application) {
    var online = require('./action/online')(application);
    return {
        "/complete-video": {
            get: {
                handler: online.completeVideo,
                middleware: [], // optional
                cors: [] //optional
            }
        }
    }
};