/**
 * Created by chotoxautinh on 12/22/16.
 */
module.exports = (app) => (
    {
        findSample: async(req, res) => {
            let limit = req.query.limit || 10,
                page = req.query.page || 1,
                offset = 0;

            if (page > 1)
                offset = (page - 1) * limit;

            const results = await app.seneca.exec({
                role: 'sample', cmd: 'findSample', limit: limit, offset: offset
            });
            return res.jsonp({
                status: 200,
                message: "Danh sách dữ liệu sample",
                data: results
            })
        },

        findSampleById: async(req, res) => {
            const result = await app.seneca.exec({
                role: 'sample', cmd: 'findSampleById', id: req.params.id
            });
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
        },

        createSample: async(req, res) => {
            const result = await app.seneca.exec({
                role: 'sample', cmd: 'createSample', payload: {
                    count: req.body.count,
                    name: req.body.name,
                    type: req.body.type
                }
            })
            return res.jsonp({
                status: 201,
                message: "Thêm mới dữ liệu thành công",
                data: result
            })
        },

        updateSample: async(req, res) => {
            const result = await app.seneca.exec({
                role: 'sample', cmd: 'updateSample', id: req.params.id,
                payload: {
                    count: req.body.count,
                    name: req.body.name,
                    type: req.body.type
                }
            })
            if (result)
                return res.jsonp({
                    status: 200,
                    message: "Cập nhật thông tin bản ghi thành công!",
                    data: result
                })
            return res.jsonp({
                status: 401,
                message: "Không tìm thấy sample với ID " + req.params.id
            })
        },

        deleteSample: async(req, res) => {
            const [result] = await app.seneca.exec({
                role: 'sample', cmd: 'deleteSample', id: req.params.id
            })
            if (result)
                return res.jsonp({
                    status: 200,
                    message: "Bản ghi đã được xóa thành công!",
                    data: result
                })
            return res.jsonp({
                status: 201,
                message: "Không tìm thấy bản ghi này hoặc đã được xóa trước đó!"
            })
        }
    }
)