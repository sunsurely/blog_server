const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Comment = require('../schemas/comments');

router.post('/comments', async (req, res) => {
  const { user, password, content } = req.body;
  const results = await Comment.find({ user });
  if (results.length) {
    return res
      .status(400)
      .json({ sucess: false, errorMessage: '이미 존재하는 데이터입니다.' });
  }

  const data = {
    commentId: new mongoose.Types.ObjectId(),
    user: user,
    password: password,
    content: content,
    createdAt: new Date(),
  };

  await Comment.create(data);
  res.json({ message: '댓글을 생성하였습니다.' });
});

module.exports = router;
