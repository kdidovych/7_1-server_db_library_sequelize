var DataTypes = require("sequelize").DataTypes;
var _shelves = require("./shelves");

function initModels(sequelize) {
  var shelves = _shelves(sequelize, DataTypes);


  return {
    shelves,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
