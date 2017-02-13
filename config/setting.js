/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = {
    web: {
        port: 8000,
        prefix: '/api', // default: ''
        path: 'web', // default: 'web'
        passport: true // default: false
    },
    seneca: {
        type: 'tcp',
        port: '1104',
        pin: 'cmd:*'
    }
}