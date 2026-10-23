'use strict';

const sqlzModels = require('../../models/sqlz');
// sequence must be exact as provided due to possible error: 'relation "nationalities" does not exist'
const MODELS = ['nationalities', 'shelves', 'customers', 'genres', 'authors', 'books', 'orders'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const modelName of MODELS) {
      const model = sqlzModels[modelName];
      await queryInterface.createTable(model.tableName, model.getAttributes());
    }
  },

  async down(queryInterface, Sequelize) {
    for (const modelName of MODELS.toReversed()) {
      const model = sqlzModels[modelName];
      await queryInterface.dropTable(model.tableName);
    }
  }
};
