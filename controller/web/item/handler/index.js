/**
 * Created by chotoxautinh on 12/22/16.
 */
var Promise = require('bluebird');

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
                role: 'item', cmd: 'findItem', options: opts
            }).then(function (results) {
                return res.jsonp({
                    status: 200,
                    message: "Danh sách dữ liệu item",
                    data: results
                })
            }).catch(next);
        },

        findItemById: function (req, res, next) {
            return Promise.coroutine(function*() {
                let result = yield app.seneca.exec({
                    role: 'item', cmd: 'findItemOriginate', table_name: 'item.item', id: req.params.id
                });
                if (result) {
                    var origin = result.child_table;
                    switch (origin) {
                        case 'fashion':
                            var item = yield app.seneca.exec({
                                role: 'fashion', cmd: 'findItemById', id: req.params.id
                            });
                            break;
                    }
                } else {
                    var origin = 'unknown';
                    var item = yield app.seneca.exec({
                        role: 'item', cmd: 'findItemById', id: req.params.id
                    });
                }
                if (item) {
                    return res.jsonp({
                        status: 200,
                        message: "Thông tin của item",
                        data: item,
                        origin: origin
                    })
                }
                return res.jsonp({
                    status: 401,
                    message: "Không tìm thấy item với ID " + req.params.id
                })
            })().catch(next)
        }
    }
}