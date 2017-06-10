const dotenv = require('dotenv');
const mongoose = require('mongoose');
const prompt = require('prompt');

const Channel = require('../model/channel');

// Dotenv config
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION);

prompt.start();

prompt.get(['name', 'youtubeId', 'category'], (err, result) => {
  const data = Object.assign({}, result, {
    category: mongoose.Types.ObjectId(result.category),
  });

  const channel = new Channel(data);
  channel
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
