const express = require('express');
const router = express.Router();
const Post = require('../schemas/posts');
const Signup = require('../schemas/signup');
const loginMiddleware = require('../middlewares/login-middleware.js');

router.post('/', loginMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { title, content } = req.body;
  const user = await Signup.findById(userId);

  const data = {
    nickname: user.nickname,
    userId,
    content,
    title,
  };

  await Post.create(data);
  res.status(201).json({ message: '게시글을 생성하였습니다.' });
});

router.get('/', async (req, res) => {
  const results = await Post.find({}).sort({ createdAt: -1 });
  const data = results.map((item) => {
    return {
      postId: item._id,
      userId: item.userId,
      nickname: item.nickname,
      content: item.content,
      title: item.title,
      createdAt: item.createdAt,
      updateAt: item.updateAt,
    };
  });
  res.json({ data });
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const data = {
    postId,
    userId: post.userId,
    title: post.title,
    nickname: post.nickname,
    content: post.content,
    creataAt: post.createdAt,
    updateAt: post.updateAt,
  };

  res.status(200).json({ data });
});

router.put('/:postId', loginMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Post.findOne({ $and: [{ userId }, { _id: postId }] });

  if (!post) {
    return res
      .status(400)
      .json({ errorMessage: '게시물을 수정할 수 없습니다.' });
  }

  await Post.updateOne({ userId, _id: postId }, { $set: { title, content } });

  res.status(201).json({ message: '게시물을 수정했습니다.' });
});

router.delete('/:postId', loginMiddleware, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  const post = await Post.findOne({ $and: [{ _id: postId }, { userId }] });

  if (!post) {
    return res.status(400).json({
      sucess: false,
      errorMessage: '게시글의 삭제 권한이 존재하지 않습니다.',
    });
  }

  await Post.deleteOne({ _id: postId });
  res.status(200).json({ message: '게시물을 삭제했습니다.' });
});

module.exports = router;
