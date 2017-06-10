const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Video = require('../model/video');
const Channel = require('../model/channel');

const youtube = require('../helper/youtube');

// Dotenv config
dotenv.config();

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.Promise = global.Promise;

const youtubeId = process.argv[2];

if (!youtubeId) {
  throw new Error('No channel data.');
}

const main = async () => {
  const channel = await Channel.findOne({ youtubeId });

  if (!channel) {
    throw new Error('Channel could not be found.');
  }

  const channelData = await youtube.getChannelData(youtubeId);
  const videosId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

  const videos = await youtube.getVideos(videosId);

  const promises = [];

  videos.forEach(videoData => {
    const data = Object.assign({}, videoData, {
      category: channel.category,
      channel: channel._id,
    });

    console.log(`${videoData.title} added to queue.`);

    promises.push(Video.add(data));
  });

  await Promise.all(promises);
  console.log('Done!');
  process.exit(1);
};

main();
