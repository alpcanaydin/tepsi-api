const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

const router = require('./router');
const responderMiddleware = require('./middleware/responder');

// Dotenv config
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION);

// Express Instance
const app = express();

// Express Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cors());
app.use(responderMiddleware);

app.use('/', router);

// Run the API
app.listen(process.env.API_PORT, () => {
  console.log(`API is running on port ${process.env.API_PORT}`);
});
