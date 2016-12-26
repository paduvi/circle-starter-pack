const DataTypes = require('sequelize');
var schemaScript = require('../../script/schema');

module.exports = function (sequelize) {
    let Fashion = sequelize.define("fashion", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            defaultValue: DataTypes.literal("item.id_generator()")
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        price: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    }, {
        tableName: 'fashion',
        schema: 'item',
        timestamps: false
    });

    Fashion.sync().then(function () {
        return sequelize.query(schemaScript.inherit('item.fashion', 'item.item'));
    });

    return Fashion
};