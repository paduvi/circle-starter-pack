/**
 * Created by chotoxautinh on 11/12/16.
 */
require('babel-core/register');
var Application = require('circlejs');
var CircleZMQ = require('circle-zmq');

var app = new Application();
app.plug(CircleZMQ, app.setting.mq);

app.start();