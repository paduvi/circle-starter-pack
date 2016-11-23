/**
 * Created by chotoxautinh on 11/23/16.
 */
const dns = require('dns')

dns.lookup('192.168.1.147', function(err, add) {
    console.log(add);
});


// const ip = require('ip');
//
// console.log(ip.isEqual("0.0.0.1", "::1"));