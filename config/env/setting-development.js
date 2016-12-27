/**
 * Created by chotoxautinh on 11/23/16.
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
            database: 'sample',
            username: 'postgres',
            password: '',
            dialect: 'postgres',
            logging: false
        }
    }
};