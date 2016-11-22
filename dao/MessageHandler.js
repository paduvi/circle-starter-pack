/**
 * Created by chotoxautinh on 11/12/16.
 */
var Promise = require('bluebird');

class MessageHandler {

    constructor(application) {
        this.app = application;
    }

    /**
     * Send response back to Message Queue to update Event's status
     * @param eventID
     */
    responseSuccess(eventID) {
        console.log("vao day rui");
    }

    createPayroll(payroll) {
        let self = this;
        return Promise.resolve().then(function () {
            if (!payroll.hasOwnProperty('user_id')) {
                throw new Error('no user_id');
            }
            if (!payroll.hasOwnProperty('revenue')) {
                throw new Error('no revenue');
            }
            let col = self.app.db.collection('payroll');
            return col.insertOne(payroll);
        });
    }

    checkExistPayroll(payload, ...attr) {
        let self = this;
        let query = {};
        if (attr){
            attr.forEach(function (key) {
                query[key] = payload[key];
            })
        } else {
            Object.assign(query, payload);
        }

        return Promise.resolve().then(function () {
            //check duplicate here


            let col = self.app.db.collection('payroll');
            return col.find(query).toArray();
        });
    }
}

module.exports = MessageHandler;