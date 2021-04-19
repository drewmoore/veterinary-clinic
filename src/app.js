const express = require('express');
const bodyParser = require('body-parser');

const dbClient = require('./db/client');

const app = express();

// Allows app to read req.body as an object, avoiding complex parsing of requests.
app.use(bodyParser.json());

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

app.post('/customers', async (req, res, next) => {
  try {
    const { firstname, lastname, email } = req.body;

    const [id] = await dbClient.query(
      'INSERT INTO customers (firstname, lastname, email) VALUES (?, ?, ?)',
      { replacements: [firstname, lastname, email] }
    );
    const [results] = await dbClient.query('SELECT * FROM customers WHERE id = ? LIMIT 1', { replacements: [id] });
    const customer = results[0];

    res.status(200);
    res.send({ data: customer });
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
