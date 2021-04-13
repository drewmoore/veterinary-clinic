const express = require('express');

const dbClient = require('./db/client');

const app = express();

app.get('/', (req, res, next) => {
  res.status(200);
  res.send('Hello!');
});

app.get('/health', async (req, res, next) => {
  try {
    // Basic check for the health of the db connection
    await dbClient.authenticate();
    res.status(200);
    res.send({ status: 'ok' });
  } catch (error) {
    next(error);
  }
});

// Error handler
app.use((error, req, res, next) => {
  res.status(500);
  res.send({ error: { name: error.name, message: error.message } });
});

module.exports = app;
