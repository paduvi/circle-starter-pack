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
        id: 94,
        from: 'online-course',
        to: 'payroll',
        status: 0,
        create_at: Date.now(),
        created_by: 4869,
        payload: {
            comment_id: 239,
            register_id: 56,
            user_id: 2,
            type: 'discuss'
        }
    };
    onlineHandler.handleDiscuss(event);
});