require('dotenv').config();
const path = require('path');
const {Sequelize, DataTypes} = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const sqlzConfigFile = path.resolve(__dirname, '..', '..', '.sequelizerc');
const configPath = require(sqlzConfigFile)['config'];
const config = require(configPath)[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const pgCheckTables = require('../cli/check/check_pg');

const Authors = require('../models/sqlz/authors');
const author = Authors(sequelize, DataTypes);

const dropTable = async (model) => {
    try {
        await model.drop();
    } catch (e) {
        console.error(e);
    }
}
const syncTable = async (model) =>
{
    try {
        await model.sync();
    } catch (e) {
        console.error(e);
    }
}
const recreateTable = async () => {
    console.log('1. check tables');
    await pgCheckTables();
    console.log('2. drop table');
    await dropTable(author);
    console.log('3. check what is left table');
    await pgCheckTables();
    console.log('4. create table by syncing model');
    await syncTable(author);
    console.log('5. check tables (sync result)');
    await pgCheckTables();
}

void recreateTable();