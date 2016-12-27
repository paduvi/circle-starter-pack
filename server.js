/**
 * Created by chotoxautinh on 11/12/16.
 */
process.env.NODE_ENV = 'production';
var Application = require('circlejs');

var app = new Application();

app.start();