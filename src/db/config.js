const config = {
  dialect: 'mysql',
  name: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false
};

module.exports = config;
