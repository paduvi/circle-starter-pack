/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = function (app) {
    return {
        getItem: function (req, res) {
            let limit = req.query.limit,
                page = req.query.page,
                offset = 0;

            if (page > 1)
                offset = (page - 1) * limit;

            let opts = {
                limit: limit,
                offset: offset
            }
            return app.dao.fashion.getItem(opts).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu fashion",
                    data: results
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            })
        },

        getItemById: function (req, res) {
            return app.dao.fashion.getItemById(req.params.id).then(function (result) {
                if (result) {
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của fashion",
                        data: result
                    })
                }
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy fashion với ID " + req.params.id
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            })
        },

        createItem: function (req, res) {
            return app.dao.fashion.createItem({
                title: req.body.title,
                description: req.body.description
            }).then(function (result) {
                return res.jsonp({
                    status: 201,
                    message: "Thêm mới dữ liệu thành công",
                    data: result
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            });
        },

        updateItem: function (req, res) {
            return app.dao.fashion.updateItem({
                title: req.body.title,
                description: req.body.description
            }, req.params.id).then(function (result) {
                return res.jsonp({
                    status: 200,
                    message: "Cập nhật thông tin bản ghi thành công!",
                    data: result
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            });
        },

        deleteItem: function (req, res) {
            return app.dao.fashion.deleteItem(req.params.id).then(function (result) {
                if (result) {
                    return res.jsonp({
                        status: 200,
                        message: "Bản ghi đã được xóa thành công!"
                    })
                }
                return res.jsonp({
                    status: 201,
                    message: "Không tìm thấy bản ghi này hoặc đã được xóa trước đó!"
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                });
            });
        }
    }
}