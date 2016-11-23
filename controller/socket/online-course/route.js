/**
 * Created by chotoxautinh on 11/23/16.
 */


module.exports = function (application) {
    var OnlineHandler = require(__base + '/dao/implement/OnlineHandler');

    return {
        "/complete-video": event => new OnlineHandler(application).handleVideoComplete(event)
    }
};
