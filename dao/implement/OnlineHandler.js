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

        var self = this;

        /* check format của payload */
        if (!this.checkValidPayload(event.payload, ['video_id', 'register_id', 'type', 'user_id']))
            return console.log("Invalid format video payload");

        /* Kiểm tra bản ghi duplicate */
        this.checkExistPayroll(event.payload, ['video_id', 'register_id', 'type', 'user_id'])
            .then(function (checkExist) {
                if (checkExist && checkExist.length) {
                    console.log("DUPLICATE");
                    return self.responseSuccess(event.id); // Gửi thông báo cho MQ rằng đã xử lý xong
                }

                /* tạo bản ghi Payroll +5,000VND */
                let payRoll = {
                    user_id: event.payload.user_id,
                    revenue: 5000,
                    video_id: event.payload.video_id,
                    register_id: event.payload.register_id,
                    type: event.payload.type
                };

                return self.createPayroll(payRoll).then(function (result) {
                    if (result.result.ok === 1) {
                        return self.responseSuccess(event.id); // Gửi thông báo cho MQ rằng đã xử lý xong
                    }
                })
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    /**
     * Hoàn thành quiz
     * @param event
     */
    handleQuizComplete(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +5,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
        let self = this;

        if (!this.checkValidPayload(event.payload, ['quiz_id', 'user_id', 'register_id', 'type'])) {
            return console.log('Invalid format quiz payload');
        }

        this.checkExistPayroll(event.payload, ['quiz_id', 'register_id', 'type', 'user_id'])
            .then(function (checkExist) {
                if (checkExist && checkExist.length) {
                    console.log("DUPLICATE");
                    return self.responseSuccess(event.id);
                }

                let payRoll = {
                    user_id: event.payload.user_id,
                    revenue: 5000,
                    quiz_id: event.payload.quiz_id,
                    register_id: event.payload.register_id,
                    type: event.payload.type
                };

                //Create payroll and announce to event_log
                return self.createPayroll(payRoll).then(function (result) {
                    if (result.result.ok === 1) {
                        return self.responseSuccess(event.id);
                    }
                })
            })
            .catch(function (error) {
                console.error(error);
            });
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
        let self = this;

        if(!this.checkValidPayload(event.payload, ['lesson_id', 'register_id', 'user_id', 'type'])) {
            return console.log('Invalid format homework mark payload');
        }

        this.checkExistPayroll(event.payload, ['lesson_id', 'register_id', 'user_id', 'type'])
            .then(function (checkExist) {
                if(checkExist && checkExist.length) {
                    console.log("DUPLICATE");
                    return self.responseSuccess(event.id);
                }

                let payRoll = {
                    user_id: event.payload.user_id,
                    revenue: 20000,
                    lesson_id: event.payload.lesson_id,
                    register_id: event.payload.register_id,
                    type: event.payload.type
                }

                return self.createPayroll(payRoll)
                    .then(function (result) {
                        if(result.result.ok === 1) {
                            return self.responseSuccess(event.id);
                        }
                    });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    /**
     * Thảo luận bài giảng
     * @param event
     */
    handleDiscuss(event) {
        // Kiểm tra bản ghi duplicate
        // Nếu ok thì xử lý truy vấn rồi tạo bản ghi Payroll +20,000VND
        // Gửi thông báo cho MQ rằng đã xử lý xong
        var self = this;

        if (!this.checkValidPayload(event.payload, ['comment_id', 'register_id', 'user_id', 'type']))
            return console.log("Invalid format discuss payload");

        this.checkExistPayroll(event.payload, ['comment_id', 'register_id', 'type', 'user_id'])
            .then(function (checkExist) {

                console.log(checkExist);
                if (checkExist && checkExist.length) {
                    console.log("DUPLICATE");
                    return self.responseSuccess(event.id);
                }

                let payRoll = {
                    user_id: event.payload.user_id,
                    revenue: 20000,
                    comment_id: event.payload.comment_id,
                    register_id: event.payload.register_id,
                    type: event.payload.type
                };

                return self.createPayroll(payRoll).then(function (result) {
                    if (result.result.ok === 1) {
                        return self.responseSuccess(event.id);
                    }
                })
            })
            .catch(function (error) {
                console.error(error);
            });
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