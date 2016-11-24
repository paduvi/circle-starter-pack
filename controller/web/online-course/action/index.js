/**
 * Created by chotoxautinh on 11/22/16.
 */
'use strict';

module.exports = function (app) {
    const OnlineHandler = require(__base + '/dao/implement/OnlineHandler');

    return {
        completeVideo: function (req, res) {
            var onlineHandler = new OnlineHandler(app);
            onlineHandler.handleVideoComplete(req.body);

            res.sendStatus(200);
        }
    }

};

