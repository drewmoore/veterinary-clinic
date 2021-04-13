const { name, username, password, host, dialect, logging } = require('./config');

/*
 * The sequelize cli does not use the sequelize client or models. It is its own entity. In order to share the same
 * configuration, the standard configuration is required and then grouped into the named environments that the
 * sequelize cli tool assumes to exist, based on the value of NODE_ENV. This pattern has its pros and cons, but we're
 * going to instead provide all of the values as environment variables in each environment.
 * For more info: https://12factor.net/config
 */
const config = ['test', 'development', 'production'].reduce((all, envName) => {
  all[envName] = {
    dialect,
    database: name,
    username,
    password,
    host,
    logging
  };

  return all;
}, {});

module.exports = config;
