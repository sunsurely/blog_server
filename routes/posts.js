const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Post = require('../schemas/posts.js');
router.post('/posts', async (req, res) => {
  const { user, password, title, content } = req.body;

  const data = {
    postId: new mongoose.Types.ObjectId(),
    user: user,
    password: password,
    content: content,
    title: title,
    createdAt: new Date(),
  };

  await Post.create(data);
  res.json({ results: 'success' });
});

router.get('/posts', async (req, res) => {
  const data = await Post.find({});
  res.json({ data });
});

module.exports = router;
