module.exports = app => ({
    findTodo: async (req, res) => {
        let {
            limit = 10,
            page = 1,
            offset = 0
        } = req.body;
        let author = req.user._id;
        if (page > 1)
            offset = (page - 1) * limit;

        const results = await app.seneca.exec({
            role: 'todo', cmd: 'findTodo', limit, offset, author
        });

        return res.jsonp({
            status: 200,
            message: 'Danh sach todo',
            data: results
        });
    },

    findTodoById: async (req, res) => {
        const author = req.user._id;
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'findTodoById', id: req.params.id, author
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'Thong tin todo',
                data: result
            });
        return res.jsonp({
            status: 401,
            message: 'Khong tim thay du lieu'
        });
    },

    createTodo: async (req, res) => {
        const author = req.user._id;
        const { text = '', complete = false } = req.body;
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'createTodo', payload: {
                author,
                text,
                complete
            }
        });
        return res.jsonp({
            status: 201,
            message: 'tao moi du lieu thanh cong',
            data: result
        });
    },

    updateTodo: async (req, res) => {
        const author = req.user._id;
        const { text, complete } = req.body;
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'updateTodo', id: req.params.id,
            payload: {
                text: text,
                complete: complete
            },
            author
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'cap nhat thong tin thanh cong',
                data: result
            });

        return res.jsonp({
            status: 401,
            message: 'You do not have to do with id: ' + req.params.id
        });
    },

    deleteTodo: async (req, res) => {
        const author = req.user._id;
        const result = await app.seneca.exec({
            role: 'todo', cmd: 'deleteTodo', id: req.params.id, author
        });

        if (result)
            return res.jsonp({
                status: 200,
                message: 'xoa todo thanh cong',
                data: result
            });
        return res.jsonp({
            status: 201,
            message: 'Khong tim thay ban ghi hoac da duoc xoa truoc do'
        });
    }
});
