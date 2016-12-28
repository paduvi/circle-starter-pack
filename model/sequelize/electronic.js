const DataTypes = require('sequelize');

module.exports = function (sequelize) {
    let Electronic = sequelize.define("electronic", {
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
        tableName: 'electronic',
        schema: 'item',
        timestamps: false
    });

    return Electronic
};