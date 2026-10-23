const path = require('path');
const {Sequelize} = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const sqlzConfigFile = path.resolve(__dirname, '..', '..', '..', '.sequelizerc');
const configPath = require(sqlzConfigFile)['config'];
const config = require(configPath)[env];

module.exports = async () => {
    try {
        const sequelize = new Sequelize(config.database, config.username, config.password, config);
        await sequelize.authenticate();
        console.log('SEQUELIZE. Database connection successfully established.');
    } catch (error) {
        console.error('SEQUELIZE. Unable to connect to the database:', error);
    }
}
