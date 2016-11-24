/**
 * Created by chotoxautinh on 11/24/16.
 */

module.exports = function (app) {
    const CourseHandler = require(__base + '/dao/CourseHandler');

    return {
        register: function (req, res) {
            var courseHandler = new CourseHandler(app);
            courseHandler.handleRegister(req.body);

            res.sendStatus(200);
        },
        dispose: function (req, res) {
            var courseHandler = new CourseHandler(app);
            courseHandler.handleDispose(req.body);

            res.sendStatus(200);
        }
    }

};

