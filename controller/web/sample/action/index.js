/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = function (app) {
    return {
        getSample: function (req, res) {
            let limit = req.query.limit,
                page = req.query.page,
                offset = 0;

            if (page > 1)
                offset = (page - 1) * limit;

            let opts = {
                limit: limit,
                offset: offset
            }
            return app.dao.sample.getSample(opts).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu sample",
                    data: results
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            })
        },

        getSampleById: function (req, res) {
            return app.dao.sample.getSampleById(req.params.id).then(function (result) {
                if (result) {
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của sample",
                        data: result
                    })
                }
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy sample với ID " + req.params.id
                })
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            })
        },

        createSample: function (req, res) {
            return app.dao.sample.createSample({
                count: req.body.count,
                name: req.body.name,
                type: req.body.type
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

        updateSample: function (req, res) {
            return app.dao.sample.updateSample({
                count: req.body.count,
                name: req.body.name,
                type: req.body.type
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

        deleteSample: function (req, res) {
            return app.dao.sample.deleteSample(req.params.id).then(function (result) {
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