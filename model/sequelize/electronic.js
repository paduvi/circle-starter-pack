const DataTypes = require('sequelize');
var schemaScript = require('../../script/schema');

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

    Electronic.sync().then(function () {
        return sequelize.query(schemaScript.inherit('item.electronic', 'item.item'));
    });

    return Electronic
};