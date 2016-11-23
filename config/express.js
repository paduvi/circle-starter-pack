/**
 * Created by chotoxautinh on 11/23/16.
 */
var helmet = require('helmet');
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');

module.exports = function (app) {
    app.use(helmet());

    app.use(methodOverride());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    if (app.setting.enableSwagger) {
        // Swagger document loader
        if (process.env.NODE_ENV === 'development') {
            app.set('view cache', false);
            app.enable('verbose errors');
            app.set("showStackError", true);
        } else {
            app.locals.cache = 'memory';
            app.disabled('verbose errors');
            app.set('trust proxy', 1);
        }

        app.enable('trust proxy');
        app.use(require('express').static(__base + '/public', {maxAge: 3600}));
    }
};