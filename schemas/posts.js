const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
    unique: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('Posts', postsSchema);
