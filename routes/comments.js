const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Comment = require('../schemas/comments');

router.post('/comments/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;
  const results = await Comment.find({ postId: _postId });
  if (results.length) {
    return res
      .status(400)
      .json({ sucess: false, errorMessage: '이미 존재하는 데이터입니다.' });
  }

  const data = {
    postId: _postId,
    commentId: new mongoose.Types.ObjectId(),
    user: user,
    password: password,
    content: content,
    createdAt: new Date(),
  };

  await Comment.create(data);
  res.json({ message: '댓글을 생성하였습니다.' });
});

router.get('/comments/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const results = await Comment.find({ postId: _postId });

  if (results.length) {
    res.json({ data: results });
  } else {
    res
      .status(400)
      .json({ success: false, errorMessage: '게시물 조회에 실패했습니다.' });
  }

  res.send({ success: 'true' });
});

router.put('/comments/:_commentId', async (req, res) => {
  const { _commentId } = req.params;
  const { password, content } = req.body;
  const results = await Comment.find({ commentId: _commentId });

  if (results) {
    if (!content) {
      return res
        .status(400)
        .json({ success: false, errorMessage: '내용을 입력해 주세요' });
    }
    const result = results[0];
    if (result.password === password) {
      await Comment.updateOne({ commentId: _commentId }, { content });
    } else {
      return res.status(400).json({
        success: false,
        errorMessage: '비밀번호가 일치하지 않습니다.',
      });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: '게시물이 존재하지 않습니다.' });
  }

  res.send('수정했습니다');
});
module.exports = router;
