/**
 * Created by hailp on 11/24/16.
 */

"use strict";

module.exports = function (app) {

    let sample = require(__base + '/models/sample_restful')(app.db.postgres);

    return {
        getSample: function (req, res) {

            let limit = req.query.limit,
                page = req.query.page,
                offset = 0;

            if (page > 1)
                offset = (page - 1) * limit;

            sample.findAndCountAll({
                limit: limit,
                offset: offset
            }).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu mẫu",
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
            sample.findById(req.params.sample_id).then(function (result) {
                if (result) {
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của sample",
                        data: result
                    })
                } else {
                    return res.jsonp({
                        status: 401,
                        message: "Không tìm thấy sample với ID " + req.params.sample_id
                    })
                }
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                })
            })
        },

        createSample: function (req, res) {

            sample.create({
                count: req.body.count,
                name: req.body.name
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
            sample.update({
                count: req.body.count,
                name: req.body.name
            },{
                where: {
                    id: req.params.sample_id
                }
            }).then(function(result){
                return res.jsonp({
                    status: 200,
                    message: "Cập nhật thông tin bản ghi thành công!",
                    data: result
                })
            }).catch(function(error){
                return res.jsonp({
                    status: 500,
                    message: error
                })
            });
        },

        deleteSample: function (req, res) {
            sample.destroy({
                where: {
                    id: req.params.sample_id
                }
            }).then(function (result) {
                if (result) {
                    return res.jsonp({
                        status: 200,
                        message: "Bản ghi đã được xóa thành công!"
                    })
                } else {
                    return res.jsonp({
                        status: 201,
                        message: "Không tìm thấy bản ghi này hoặc đã được xóa trước đó!"
                    })
                }
            }).catch(function (error) {
                return res.jsonp({
                    status: 500,
                    message: error
                });
            });
        }
    }
};

