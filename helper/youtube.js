const rp = require('request-promise');

const getChannelData = channelId => {
  const uri = 'https://www.googleapis.com/youtube/v3/channels';
  const options = {
    uri,
    qs: {
      id: channelId,
      key: process.env.YOUTUBE_API_KEY,
      part: 'contentDetails',
    },
    json: true,
  };

  return rp(options);
};

const getVideos = (playlistId, previousVideos = [], pageToken) => {
  const uri = 'https://www.googleapis.com/youtube/v3/playlistItems';
  const qs = {
    playlistId,
    maxResults: 50,
    part: 'snippet,contentDetails',
    key: process.env.YOUTUBE_API_KEY,
  };

  if (pageToken) {
    qs.pageToken = pageToken;
  }

  const options = {
    uri,
    qs,
    json: true,
  };

  return rp(options).then(response => {
    const items = response.items.map(item => ({
      title: item.snippet.title,
      youtubeId: item.contentDetails.videoId,
    }));

    const allVideos = [...items, ...previousVideos];

    if (allVideos.length <= 1000 && response.nextPageToken) {
      return getVideos(playlistId, allVideos, response.nextPageToken);
    }

    return allVideos;
  });
};

module.exports = {
  getChannelData,
  getVideos,
};
