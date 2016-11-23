/**
 * Created by chotoxautinh on 11/12/16.
 */
process.env.NODE_ENV = 'production';
var Application = require('./utilities/Application');

var app = new Application({
    enableSwagger: true
});

app.start();