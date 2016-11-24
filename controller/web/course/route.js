/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = function (application) {
    var index = require('./action/index')(application);
    var online = require('./action/online')(application);
    var offline = require('./action/offline')(application);

    return {

        /* Đăng ký học */
        "/register": {
            post: {
                handler: index.register
            }
        },

        /* Dừng học */
        "/dispose": {
            post: {
                handler: index.dispose
            }
        },

        /* Online */
        "/complete-video": {
            get: { // test
                handler: (req, res) => res.sendStatus(200),
                middleware: [], // optional
                cors: "localhost" //optional
            },
            post: {
                handler: online.completeVideo,
                middleware: [], // optional
            }
        },

        /* Offline */
        "/rollcall": {
            post: {
                handler: offline.rollcall
            }
        }
    }
};