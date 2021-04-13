const { Sequelize } = require('sequelize');
const { name, username, password, host, dialect, logging } = require('./config');

const sequelize = new Sequelize({
  dialect,
  database: name,
  host,
  username,
  password,
  logging
});

module.exports = sequelize;
