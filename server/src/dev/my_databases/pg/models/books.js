const {DataTypes, Model} = require('sequelize');

class Books extends Model {}

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
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelf_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    }
};

const options = {
    createdAt: true,
    updatedAt: true,
    tableName: 'books',
};

const getModel = (sequelize) => {
    if (!sequelize.models.Books) {
        Books.init(attributes, {...options, sequelize});
    }
    return sequelize.models.Books;
};

module.exports = {
    class: Books,
    attributes,
    options,
    getModel
}
