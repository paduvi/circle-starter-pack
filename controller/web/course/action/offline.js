/**
 * Created by chotoxautinh on 11/24/16.
 */

module.exports = function (app) {
    const OfflineHandler = require(__base + '/dao/implement/OfflineHandler');

    return {
        rollcall: function (req, res) {
            var offlineHandler = new OfflineHandler(app);
            offlineHandler.handleRollCall(req.body);

            res.sendStatus(200);
        }
    }

};

