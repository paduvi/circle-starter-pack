/**
 * Created by chotoxautinh on 12/27/16.
 */
// function add1(a, b) {
//     let args = Array.prototype.slice.call(arguments);
//     args.unshift(1);
//     return add.apply(this, args);
// }
//
// function add(a, b, c) {
//     return a + b + c;
// }
//
// console.log(add1(2, 3));

var x = 1;

function plugin() {
    var app = this;
    console.log(app.x);
}

function test(next) {
    next()
}

test(plugin);