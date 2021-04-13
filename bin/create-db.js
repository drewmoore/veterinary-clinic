const mysql = require('mysql2/promise');
const { name, username, password, host } = require('../src/db/config');

// Wait for an arbitrary amount of time.
const sleep = () => (
  new Promise((resolve) => {
    setTimeout(resolve, 5000);
  })
);

// Connect to the database, which might not be ready when this script is run. Therefore,
// wait and retry on failed connections.
const connect = async (attempts = 0) => {
  const maxAttempts = 5; // Arbitrary value. Adjust as needed.

  try {
    return await mysql.createConnection({
      user: username,
      password,
      host
    });
  } catch (error) {
    if (!error.message.includes('ECONNREFUSED') || attempts === maxAttempts) {
      throw error;
    }
    console.log(`Could not connect to database. Attempt: ${attempts}. Waiting and retrying...`);
    await sleep();
    return await connect(attempts + 1);
  }
};

connect().then(async (connection) => {
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${name};`);
  console.log(`DB with name ${name} created.`);
  process.exit(0);
}).catch((error) => {
  console.log('There was an error:', error);
  process.exit(1);
});
