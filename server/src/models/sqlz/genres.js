const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('genres', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'genres',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "genres_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
