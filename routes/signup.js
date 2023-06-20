const express = require('express');
const router = express.Router();
const Signup = require('../schemas/signup');

router.post('/', async (req, res) => {
  const { nickname, password, confirm } = req.body;

  if (!nickname) {
    return res.status(400).json({ errorMessage: '닉네임을 입력해 주세요' });
  }

  if (password !== confirm) {
    return res
      .status(400)
      .json({ errorMessage: '패스워드가 패스워드 확인과 다릅니다.' });
  }

  const isExistUser = await Signup.findOne({ password });
  if (isExistUser) {
    return res
      .status(400)
      .json({ errorMessage: '이미 존재하는 이용자입니다.' });
  }

  const signup = new Signup({ nickname, password });
  signup.save();
  await res.status(201).send('회원가입이 완료되었습니다.');
});

module.exports = router;
