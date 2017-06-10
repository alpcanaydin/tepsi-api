const dotenv = require('dotenv');
const mongoose = require('mongoose');
const prompt = require('prompt');

const Category = require('../model/category');

// Dotenv config
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION);

prompt.start();

prompt.get(['name'], (err, result) => {
  const category = new Category({ name: result.name });
  category
    .save()
    .then(() => {
      console.log('Done!');
      process.exit(1);
    })
    .catch(addErr => {
      console.log(addErr);
      process.exit(1);
    });
});
