/**
 * Created by chotoxautinh on 11/12/16.
 */
var CourseHandler = require('../CourseHandler');

class OnlineHandler extends CourseHandler {

    /**
     * Hoàn thành video
     * @param event
     */
    handleVideoComplete(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +5,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Hoàn thành quiz
     * @param event
     */
    handleQuizComplete(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +5,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Đánh giá khóa học
     * @param event
     */
    handleCourseRating(event) {
        // Nếu khóa có nhiều giảng viên thì chia đều và duyệt từng giảng viên
        // Mỗi giảng viên ứng với 1 Payroll riêng
        // Kiểm tra bản ghi đã có (trùng giảng viên, register_id)
        // Nếu rating khác nhau thì phải tạo bản ghi Payroll cộng/trừ
        // 4 sao: +60,000VND
        // 5 sao: +80,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Hỗ trợ Skype/Teamviewer
     * @param event
     */
    handleSupport(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +60,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Chấm bài
     * @param event
     */
    handleHomeworkMark(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +20,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Thảo luận bài giảng
     * @param event
     */
    handleDiscuss(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +20,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Dừng học/ Chuyển sang Thực tập
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

module.exports = OnlineHandler;