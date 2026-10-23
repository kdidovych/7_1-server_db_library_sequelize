const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shelves', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shelves',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "shelves_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
