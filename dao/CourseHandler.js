/**
 * Created by chotoxautinh on 11/12/16.
 */
var MessageHandler = require('./MessageHandler');

class CourseHandler extends MessageHandler {

    /**
     * Kiểm tra số tiền thưởng hiện tại đã vượt quá ngưỡng 80% số tiền học viên đóng chưa?
     * @param query
     */
    checkOverThreshold(query) {

    }

    /**
     * Xử lý Event học viên đóng tiền khóa học
     * @param payload
     */
    handleRegister(payload) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Dừng học
     * @param event
     */
    handleDispose(event) {
        // Trước hết truy vấn theo register_id và lấy sum(revenue) group by user_id
        // Với mỗi user_id tương ứng với 1 Payroll
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì tạo Payroll
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }
}

module.exports = CourseHandler;