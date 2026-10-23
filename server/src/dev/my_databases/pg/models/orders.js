const {DataTypes, Model} = require('sequelize');

class Orders extends Model {}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: DataTypes.DATEONLY
    },
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'orders',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Orders) {
        Orders.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Orders;
};

module.exports = {
    class: Orders,
    attributes,
    options,
    getModel
}
