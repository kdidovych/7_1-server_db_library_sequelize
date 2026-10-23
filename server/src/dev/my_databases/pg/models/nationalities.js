const {DataTypes, Model} = require('sequelize');

class Nationalities extends Model {}

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
    tableName: 'nationalities',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Nationalities) {
        Nationalities.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Nationalities;
};

module.exports = {
    class: Nationalities,
    attributes,
    options,
    getModel
}