const DataTypes = require('sequelize');
var schemaScript = require('../../script/schema');

module.exports = function (sequelize) {
    let Book = sequelize.define("book", {
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
        tableName: 'book',
        schema: 'item',
        timestamps: false
    });

    Book.sync().then(function () {
        return sequelize.query(schemaScript.inherit('item.book', 'item.item'));
    });

    return Book
};