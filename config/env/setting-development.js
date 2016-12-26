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
            host: 'localhost',
            port: '5432',
            database: 'sample',
            username: 'postgres',
            password: '',
            dialect: 'postgres',
            logging: false
        }
    },
    mq: {
        sub_prefix: "circle:",
        pub_address: "tcp://localhost:3000",
        enable: true
    }
};