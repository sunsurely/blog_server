const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema(
  {
    password: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      require: true,
    },
    title: {
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

module.exports = mongoose.model('Posts', postsSchema);
