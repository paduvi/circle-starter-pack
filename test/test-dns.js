/**
 * Created by chotoxautinh on 11/23/16.
 */
const dns = require('dns')

dns.lookup('techmaster.vn', function (err, add) {
    console.log(add);
});
