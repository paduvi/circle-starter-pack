/**
 * Created by chotoxautinh on 11/23/16.
 */
module.exports = {

    enableSwagger: true,
    db: {
        mongo: {
            host: "localhost",
            port: 27017,
            name: "payroll"
        },
        postgres: {
            host: '192.168.1.60',
            port: '5432',
            database: 'payroll',
            username: 'postgres',
            password: 'abc',
            dialect: 'postgres',
            logging: false
        }
    },
    mq: {
        sub_prefix: "payroll:",
        pub_address: "tcp://localhost:3000"
    },
    web: {
        port: 8000,
        prefix: '/api'
    }
};