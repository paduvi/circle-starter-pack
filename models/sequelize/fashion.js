const DataTypes = require('sequelize');
var item = require('./item');

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
        description: DataTypes.TEXT
    }, {
        tableName: 'fashion',
        schema: 'item',
        timestamps: false
    });

    Fashion.hook('afterCreate', function (fashion, options) {
        // 'transaction' will be available in options.transaction
        let Item = item(sequelize);
        // This operation will be part of the same transaction as the
        // original User.create call.
        return Item.create(Object.assign({}, fashion.toJSON(), {type: 'fashion'}), {transaction: options.transaction});
    });

    Fashion.sync().then(function () {
        return sequelize.transaction(function (t) {
            return Fashion.create({
                title: 'ahihi',
                description: 'do ngok'
            }, {
                transaction: t
            })
        })
    })

    return Fashion
};