/**
 * Created by chotoxautinh on 11/12/16.
 */
module.exports = {
    db: {
        mongo: {
            host: "localhost",
            port: 27017,
            name: "payroll"
        },
        postgres: {
            host: 'localhost',
            port: '5432',
            database: 'payroll',
            username: 'postgres',
            password: '',
            dialect: 'postgres',
            logging: false
        }
    },
    zmq: {
        sub_prefix: "payroll:",
        pub_address: "tcp://localhost:3000"
    },
    web: {
        port: 8000,
        prefix: '/api'
    }
}