const DataTypes = require('sequelize');
var schemaScript = require('../../script/schema');

module.exports = function (sequelize) {
    let Service = sequelize.define("service", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            defaultValue: DataTypes.literal("item.id_generator()")
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'service',
        schema: 'item',
        timestamps: false
    });

    Service.sync().then(function () {
        return sequelize.query(schemaScript.inherit('item.service', 'item.item'));
    });

    return Service
};