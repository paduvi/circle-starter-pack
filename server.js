/**
 * Created by chotoxautinh on 11/12/16.
 */
process.env.NODE_ENV = 'production';
var Application = require('./utilities/Application');
var CircleZMQ = require('circle-zmq');

var app = new Application();
app.plug(CircleZMQ, app.setting.mq);

app.start();