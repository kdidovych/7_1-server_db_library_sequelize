const {DataTypes, Model} = require('sequelize');

class Genres extends Model {}

const attributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'genres',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Genres) {
        Genres.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Genres;
};

module.exports = {
    class: Genres,
    attributes,
    options,
    getModel
}
