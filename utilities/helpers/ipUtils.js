/**
 * Created by chotoxautinh on 11/23/16.
 */
var ip = require('ip');
var Promise = require('bluebird');
var dnsLookup = Promise.promisify(require('dns').lookup);

exports.isAllowed = function (origin, allow) {
    return Promise.coroutine(function* () {
        let allowIP = yield dnsLookup(allow);
        let originIP = yield dnsLookup(origin);
        if (isLocalhost(originIP) && isLocalhost(allowIP))
            return true;
        return ip.isEqual(originIP, allowIP);
    })();
}

function isLocalhost(a) {
    if (ip.isEqual(a, ip.address()) || ip.isEqual(a, '127.0.0.1') || ip.isEqual(a, '0.0.0.1'))
        return true;
    return false;
}