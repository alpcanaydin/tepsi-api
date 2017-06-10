const mongoose = require('mongoose');

const recommendSchema = mongoose.Schema(
  {
    channel: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

recommendSchema.set('toJSON', { getters: true, virtuals: true });
recommendSchema.options.toJSON.transform = function(doc, ret) {
  /* eslint-disable no-param-reassign */
  delete ret._id;
  delete ret.__v;
  delete ret.createdAt;
  delete ret.updatedAt;
  /* eslint-enable */

  return Object.assign(ret, { id: doc._id });
};

module.exports = mongoose.model('Recommend', recommendSchema);
