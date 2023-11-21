require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const router = require('./routes/route');

const PORT = process.env.PORT;

// to know how body request type
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// logger
app.use(logger);

// API route
app.use('', router);

app.listen(PORT, () => {
  console.log(`sentry project listening at http://localhost:${PORT}`);
});
