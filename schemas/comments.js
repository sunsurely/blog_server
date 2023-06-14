const mongoose = require('mongoose');

const commentSchma = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
  },
  user: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  password: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Comments', commentSchma);
