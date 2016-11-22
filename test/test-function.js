/**
 * Created by chotoxautinh on 11/22/16.
 */
var Application = require('../utilities/Application');
var database = require('../config/database');
var OnlineHandler = require('../dao/implement/OnlineHandler');

var app = new Application();

return Promise.resolve().then(function () {
    return database(app);
}).then(function (db) {
    app.db = db;
    // return app.db.dropCollection('payroll');
}).then(function () {
    let onlineHandler = new OnlineHandler(app);

    var event = {
        id: 1,
        from: 'online-course',
        to: 'payroll',
        status: 0,
        create_at: Date.now(),
        created_by: 3277,
        payload: {
            video_id: 3,
            register_id: 4,
            trainer_id: 2504,
            type: 'complete_video'
        }
    };
    onlineHandler.handleVideoComplete(event);
})