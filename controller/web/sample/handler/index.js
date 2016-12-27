/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = function (app) {

    return {
        findSample: function (req, res, next) {
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
                role: 'sample', cmd: 'findSample', options: opts
            }).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu sample",
                    data: results
                })
            }).catch(next)
        },

        findSampleById: function (req, res, next) {
            return app.seneca.exec({
                role: 'sample', cmd: 'findSampleById', id: req.params.id
            }).then(function (result) {
                if (result)
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của sample",
                        data: result
                    })

                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy sample với ID " + req.params.id
                })
            }).catch(next)
        },

        createSample: function (req, res, next) {
            return app.seneca.exec({
                role: 'sample', cmd: 'createSample', payload: {
                    count: req.body.count,
                    name: req.body.name,
                    type: req.body.type
                }
            }).then(function (result) {
                return res.jsonp({
                    status: 201,
                    message: "Thêm mới dữ liệu thành công",
                    data: result
                })
            }).catch(next);
        },

        updateSample: function (req, res, next) {
            return app.seneca.exec({
                role: 'sample', cmd: 'updateSample', payload: {
                    count: req.body.count,
                    name: req.body.name,
                    type: req.body.type
                }, id: req.params.id
            }).then(function (result) {
                if (result > 0)
                    return res.jsonp({
                        status: 200,
                        message: "Cập nhật thông tin bản ghi thành công!",
                    })
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy sample với ID " + req.params.id
                })
            }).catch(next);
        },

        deleteSample: function (req, res, next) {
            return app.seneca.exec({
                role: 'sample', cmd: 'deleteSample', id: req.params.id
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