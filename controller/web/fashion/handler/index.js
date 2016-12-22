/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = function (app) {
    function handlerError(res, err) {
        let logger = app.helpers.logger;
        logger.error(err);
        return res.jsonp({
            status: 500,
            message: err.message
        })
    }

    return {
        findItem: function (req, res) {
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
            }).catch(function (error) {
                return handlerError(res, error);
            })
        },

        findItemById: function (req, res) {
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
            }).catch(function (error) {
                return handlerError(res, error);
            })
        },

        createItem: function (req, res) {
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
            }).catch(function (error) {
                return handlerError(res, error);
            });
        },

        updateItem: function (req, res) {
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
            }).catch(function (error) {
                return handlerError(res, error);
            });
        },

        deleteItem: function (req, res) {
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
            }).catch(function (error) {
                return handlerError(res, error);
            });
        }
    }
}