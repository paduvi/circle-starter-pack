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
        console.log("vao day rui:" + eventID);
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
            return col.insertOne(Object.assign(payroll, {created_at: Date.now()}));
        });
    }

    checkExistPayroll(payload, attr) {
        let self = this;
        let query = {};
        if (attr) {
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

    checkValidPayload(payload, attr) {
        for (let key of attr) {
            if (!payload.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}

module.exports = MessageHandler;