const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },

    youtubeId: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

videoSchema.set('toJSON', { getters: true, virtuals: true });
videoSchema.options.toJSON.transform = function(doc, ret) {
  /* eslint-disable no-param-reassign */
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
  /* eslint-enable */

  return Object.assign(ret, { id: doc._id });
};

videoSchema.statics.add = function(data) {
  return this.findOne({ youtubeId: data.youtubeId }).then(video => {
    if (video !== null) {
      return video;
    }

    const newVideo = new this();
    newVideo.category = data.category;
    newVideo.channel = data.channel;
    newVideo.youtubeId = data.youtubeId;
    newVideo.name = data.title;

    return newVideo.save();
  });
};

module.exports = mongoose.model('Video', videoSchema);
