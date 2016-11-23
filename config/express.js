/**
 * Created by chotoxautinh on 11/23/16.
 */
var helmet = require('helmet');
var bodyParser  = require('body-parser');

module.exports = function (app) {
    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
}