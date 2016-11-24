/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = function (application) {
    var online = require('./action/index')(application);
    return {
        "/complete-video": {
            get: {
                handler: (req, res) => res.sendStatus(200),
                middleware: [], // optional
                cors: "14.177.9.185" //optional
            },
            post: {
                handler: online.completeVideo,
                middleware: [], // optional
            }
        }
    }
};