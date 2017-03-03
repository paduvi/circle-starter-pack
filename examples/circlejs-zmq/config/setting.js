/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = {
    mq: {
        sub_prefix: "circle:",
        pub_address: "tcp://localhost:3000",
        path: 'socket' // default: 'socket'
    },
    web: {
        port: 8000,
        prefix: '/api', // default: ''
        path: 'web', // default: 'web'
        passport: true // default: false
    },
    seneca: {
        type: 'http',
        port: '1104',
        pin: 'cmd:*'
    }
}