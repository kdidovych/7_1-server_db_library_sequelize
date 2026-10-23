const {DataTypes, Model} = require('sequelize');

class Shelves extends Model {}

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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'shelves',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Shelves) {
        Shelves.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Shelves;
};

module.exports = {
    class: Shelves,
    attributes,
    options,
    getModel
}