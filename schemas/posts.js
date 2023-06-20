const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

postsSchema.virtual('postId').get(function () {
  return this._id.toHexString();
});

postsSchema.set('toJson', {
  virtual: true,
});

module.exports = mongoose.model('Posts', postsSchema);
