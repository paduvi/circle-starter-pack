/**
 * Created by hailp on 11/24/16.
 */

'use strict';

const DataTypes = require('sequelize');

module.exports = function (sequelize) {
    let Sample = sequelize.define("sample", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                isInt: {
                    msg: 'Count must be an integer number'
                }
            }
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isInt: {
                    msg: 'Count must be an integer number'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        type: DataTypes.ENUM('fashion', 'electronic', 'service', 'book')
    }, {
        tableName: 'sample_demo',
        timestamps: false,
        schema: 'sample'
    });

    Sample.sync();
    return Sample;
};