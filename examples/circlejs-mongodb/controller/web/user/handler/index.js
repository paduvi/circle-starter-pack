module.exports = app => ({
    createUser: async (req, res) => {
        const {
            username,
            password
        } = req.body;
        const data = await app.seneca.exec({
            role: 'user', cmd: 'createUser', username, password
        });

        if (data)
            return res.jsonp({
                status: 200,
                message: 'Create user success',
                data
            });
        return res.jsonp({
            status: 400,
            message: 'Create user error'
        });
    },

    findUser: async (req, res) => {

        const data = await app.seneca.exec({
            role: 'user', cmd: 'findUser'
        });

        if (data)
            return res.jsonp({
                status: 200,
                message: 'Get data success',
                data
            });
        return res.jsonp({
            status: 400,
            message: 'Find user error'
        });
    },

    login: async (req, res) => {
        const {
            username, password
        } = req.body;

        const data = await app.seneca.exec({
            role: 'user', 'cmd': 'loginUser', username, password
        });

        if (data)
            return res.jsonp({
                status: 200,
                message: 'Login success',
                data
            });
        return res.jsonp({
            status: 400,
            message: 'Login error'
        });
    }
})