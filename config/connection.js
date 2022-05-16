// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// import dotenv module, config method uses .env file
require('dotenv').config();

// must be let sequelize, not const
let sequelize;

// this way we can use remote db or local one
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;