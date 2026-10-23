const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "books_title_key"
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'genres',
        key: 'id'
      }
    },
    shelf_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shelves',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "books_title_key",
        unique: true,
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
