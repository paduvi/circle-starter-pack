/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = function (app) {

    return {
        findItem: function (req, res, next) {
            let limit = req.query.limit,
                page = req.query.page,
                offset = 0;

            if (page > 1)
                offset = (page - 1) * limit;

            let opts = {
                limit: limit,
                offset: offset
            }
            return app.seneca.exec({
                role: 'fashion', cmd: 'findItem', options: opts
            }).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu fashion",
                    data: results
                })
            }).catch(next)
        },

        findItemById: function (req, res, next) {
            return app.seneca.exec({
                role: 'fashion', cmd: 'findItemById', id: req.params.id
            }).then(function (result) {
                if (result)
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của fashion",
                        data: result
                    })
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy fashion với ID " + req.params.id
                })
            }).catch(next)
        },

        createItem: function (req, res, next) {
            return app.seneca.exec({
                role: 'fashion', cmd: 'createItem', payload: {
                    title: req.body.title,
                    description: req.body.description
                }
            }).then(function (result) {
                return res.jsonp({
                    status: 201,
                    message: "Thêm mới dữ liệu thành công",
                    data: result
                })
            }).catch(next);
        },

        updateItem: function (req, res, next) {
            return app.seneca.exec({
                role: 'fashion', cmd: 'updateItem', payload: {
                    title: req.body.title,
                    description: req.body.description
                }, id: req.params.id
            }).then(function (result) {
                if (result > 0)
                    return res.jsonp({
                        status: 200,
                        message: "Cập nhật thông tin bản ghi thành công!"
                    })
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy fashion với ID " + req.params.id
                })
            }).catch(next);
        },

        deleteItem: function (req, res, next) {
            return app.seneca.exec({
                role: 'fashion', cmd: 'deleteItem', id: req.params.id
            }).then(function (result) {
                if (result > 0)
                    return res.jsonp({
                        status: 200,
                        message: "Bản ghi đã được xóa thành công!"
                    })
                return res.jsonp({
                    status: 201,
                    message: "Không tìm thấy bản ghi này hoặc đã được xóa trước đó!"
                })
            }).catch(next);
        }
    }
}