const mongoose = require('mongoose');

const commentScehma = new mongoose.Schema(
  {
    postId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

commentScehma.virtual('commentId').get(function () {
  return this._id.toHexString();
});

commentScehma.set('toJson', {
  virtual: true,
});

module.exports = mongoose.model('Comments', commentScehma);
