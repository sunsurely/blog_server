const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../schemas/posts.js');

router.post('/', async (req, res) => {
  const { user, password, title, content } = req.body;
  const results = await Post.find({ user });
  if (results.length) {
    return res
      .status(400)
      .json({ sucess: false, errorMessage: '이미 존재하는 데이터입니다.' });
  }
  const data = {
    postId: new mongoose.Types.ObjectId(),
    user: user,
    password: password,
    content: content,
    title: title,
  };

  await Post.create(data);
  res.json({ message: '게시글을 생성하였습니다.' });
});

router.get('/', async (req, res) => {
  const results = await Post.find({}).sort({ createdAt: -1 });
  const data = results.map((item) => {
    return {
      postId: item._id,
      user: item.user,
      title: item.title,
      createdAt: item.createdAt,
    };
  });
  res.json({ data });
});

router.get('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const results = await Post.find({ _id: _postId }).sort({ createdAt: -1 });
  const data = results.map((item) => {
    return {
      postId: item._id,
      user: item.user,
      title: item.title,
      content: item.content,
      creataAt: item.createdAt,
    };
  });

  res.json({ data });
});

router.put('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;
  const results = await Post.find({ _id: _postId });

  if (results.length === 0) {
    return res
      .status(400)
      .json({ success: false, errorMessage: '게시물 조회에 실패했습니다.' });
  }

  const post = results[0];
  if (post.password === password) {
    await Post.updateOne({ _id: _postId }, { title, content });
    return res.status(200).send('게시물을 수정했습니다.');
  } else {
    return res
      .status(400)
      .json({ success: false, errorMessage: '비밀번호가 일치하지 않습니다.' });
  }
});

router.delete('/:_postId', async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;
  const results = await Post.find({ _id: _postId });

  if (results.length === 0) {
    return res
      .status(400)
      .json({ sucess: false, errorMessage: '게시물 조회에 실패했습니다.' });
  }

  const post = results[0];
  if (post.password === password) {
    await Post.deleteOne({ _id: _postId });
    return res.status(200).send('게시물을 삭제했습니다.');
  } else {
    return res
      .status(400)
      .json({ sucess: false, errorMessage: '비밀번호가 일치하지 않습니다' });
  }
});

module.exports = router;
