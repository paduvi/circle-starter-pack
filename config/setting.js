/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = {
    db: {
        mongo: {
            host: "localhost",
            port: 27017,
            name: "circle"
        },
        postgres: {
            host: 'localhost',
            port: '5432',
            database: 'circle',
            username: 'postgres',
            password: '',
            dialect: 'postgres',
            logging: false
        }
    },
    mq: {
        sub_prefix: "circle:",
        pub_address: "tcp://localhost:3000",
        enable: false
    },
    web: {
        port: 8000,
        prefix: '/api'
    },
    seneca: {
        type: 'http',
        port: '1104',
        pin: 'cmd:*'
    }
}