/**
 * Created by chotoxautinh on 11/12/16.
 */
var CourseHandler = require('../CourseHandler');

class OfflineHandler extends CourseHandler {

    /**
     * Điểm danh
     * @param event
     */
    handleRollCall(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì tạo Payroll
        // Nếu trùng lặp nhưng khác nhau số lượng học viên điểm danh thì tạo Payroll cộng/trừ
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

}

module.exports = OfflineHandler;