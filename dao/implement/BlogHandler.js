/**
 * Created by chotoxautinh on 11/12/16.
 */
var MessageHandler = require('../MessageHandler');

class BlogHandler extends MessageHandler {

    /**
     * Viết blog
     * @param event
     */
    handleBlogPost(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì tạo Payroll
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

    /**
     * Xóa blog
     * @param event
     */
    handleBlogDelete(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì tạo Payroll
        // Gửi thông báo cho MQ rằng đã xử lý xong
    }

}

module.exports = BlogHandler;