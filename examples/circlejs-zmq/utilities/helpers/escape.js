/**
 * Created by chotoxautinh on 12/14/16.
 */
exports.name = function (raw) {
    var parts = raw.split('.');
    return parts.map(name => `"${name.replace(/^"+|"+$/gm, '')}"`).join('.');
}

exports.text = function (raw) {
    return `'${raw}'`;
}