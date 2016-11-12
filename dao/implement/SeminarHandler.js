/**
 * Created by chotoxautinh on 11/12/16.
 */
var MessageHandler = require('../MessageHandler');

class SeminarHandler extends MessageHandler {

    /**
     * Học viên dự seminar submit trả lời quiz
     * @param event
     */
    handleSeminar(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì tạo Payroll
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

}

module.exports = SeminarHandler;