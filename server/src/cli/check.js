require('dotenv').config();

const checkPG = require('./check/check_pg');
void checkPG();

const checkSqlzAuth = require('./check/sequelize_auth');
void checkSqlzAuth();

