module.exports = (app) => {
    const todoHandler = require('./handler')(app);

    return {
        "/": {
            get: {
                handler: todoHandler.findTodo,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['manage_own_todo'],
                    option: {}
                }
            }
        },
        "/:id": {
            get: {
                handler: todoHandler.findTodoById,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['manage_own_todo']
                }
            },
            put: {
                handler: todoHandler.updateTodo,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['manage_own_todo']
                }
            },
            delete: {
                handler: todoHandler.deleteTodo,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['manage_own_todo'],
                    option: {}
                }
            }
        },
        "/create": {
            post: {
                handler: todoHandler.createTodo,
                authenticate: {
                    name: 'secondJWT',
                    permissions: ['manage_own_todo']
                }
            }
        },
        "/cors/:id([0-9]+)": {
            get: {
                handler: todoHandler.findTodoById,
                middleware: [],
                cors: 'chotoxautinh.com'
            }
        },
        // "/auth/test": {
        //     get: {
        //         handler: (req, res) =>
        //             res.json(req.user)
        //         ,
        //         authenicate: {
        //             name: 'secondJWT',
        //             permissions: ['manage_todo'],
        //             option: {}
        //         }
        //     }
        // }
    }
}