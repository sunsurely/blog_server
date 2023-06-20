const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Comment = require('../schemas/comments');
const loginMiddleware = require('../middlewares/login-middleware');

router.post('/:postId', loginMiddleware, async (req, res) => {
  const { user } = res.locals;
  const { postId } = req.params;
  const { comment } = req.body;

  console.log(user);

  if (!comment) {
    return res.status(400).json({ errorMessage: '내용을 입력해 주세요' });
  }

  const data = {
    postId,
    userId: user.userId,
    nickname: user.nickname,
    comment,
  };

  await Comment.create(data);
  res.status(201).json({ message: '댓글을 작성하였습니다.' });
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const results = await Comment.find({ postId }).sort({
    createdAt: -1,
  });

  if (results.length) {
    const data = results.map((item) => {
      return {
        postId: item.postId,
        commentId: item._id,
        nickname: item.nickname,
        comment: item.comment,
        createdAt: item.createdAt,
      };
    });
    res.json({ data });
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: '게시물 조회에 실패했습니다.' });
  }
});

router.put('/:commentId', loginMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;
  const { comment } = req.body;
  const result = await Comment.findOne({
    $and: [{ _id: commentId }, { userId }],
  });

  if (!result) {
    return res.status(400).json({
      success: false,
      errorMessage: '댓글의 수정 권한이 존재하지 않습니다.',
    });
  }

  await Comment.updateOne({ userId, _id: commentId }, { $set: { comment } });

  res.status(200).json({ message: '댓글을 수정하였습니다.' });
});
//
router.delete('/:commentId', loginMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;

  const comment = await Comment.findOne({
    $and: [{ userId }, { _id: commentId }],
  });
  if (!comment) {
    return res.status(400).json({
      errorMessage: '해당 댓글의 삭제권한이 존재하지 않습니다.',
    });
  }

  await Comment.deleteOne({ _id: commentId });

  res.status(201).json({ errorMessage: '댓글을 삭제하였습니다.' });
});

module.exports = router;
