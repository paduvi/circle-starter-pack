const DataTypes = require('sequelize');

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

    return Fashion
};