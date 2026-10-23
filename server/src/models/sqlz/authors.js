const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authors', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "authors_full_name_key"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "authors_email_key"
    },
    nationality_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nationalities',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'authors',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "authors_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "authors_full_name_key",
        unique: true,
        fields: [
          { name: "full_name" },
        ]
      },
      {
        name: "authors_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
