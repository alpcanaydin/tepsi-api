const mongoose = require('mongoose');

const channelSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
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

channelSchema.set('toJSON', { getters: true, virtuals: true });
channelSchema.options.toJSON.transform = function(doc, ret) {
  /* eslint-disable no-param-reassign */
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
  /* eslint-enable */

  return Object.assign(ret, { id: doc._id });
};

module.exports = mongoose.model('Channel', channelSchema);
