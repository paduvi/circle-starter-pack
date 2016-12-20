/**
 * Created by hailp on 11/24/16.
 */

'use strict';

let Sequelize = require('sequelize');

module.exports = function (sequelize) {
    let Sample = sequelize.define("sample", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            validate: {
                isInt: {
                    msg: 'Count must be an integer number'
                }
            }
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate : {
                isInt : {
                    msg : 'Count must be an integer number'
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 'sample_demo',
        timestamps: false
    });

    Sample.sync();
    return Sample
};