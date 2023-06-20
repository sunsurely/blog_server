const express = require('express');
const router = express.Router();
const Signup = require('../schemas/signup');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { nickname, password } = req.body;

  const user = await Signup.findOne({ nickname });

  if (!user || password !== user.password) {
    return res
      .status(400)
      .json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요' });
  }

  const token = jwt.sign({ userId: user.userId }, 'customized-secret-key');
  res.cookie('Authorization', `Bearer ${token}`);
  res.status(200).json({ token });
});

module.exports = router;
