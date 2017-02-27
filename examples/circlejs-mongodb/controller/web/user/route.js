module.exports = (app) => {
    const userHandler = require('./handler')(app);
    return {
        "/": {
            get: {
                handler: userHandler.findUser
            },
            post: {
                handler: userHandler.login
            }
        },
        "/create": {
            post: {
                handler: userHandler.createUser
            }
        }
    }
}