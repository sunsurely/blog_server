const mongoose = require('mongoose');

const commentSchma = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    user: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    password: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Comments', commentSchma);
