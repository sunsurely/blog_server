const jwt = require('jsonwebtoken');
const Signup = require('../schemas/signup');

const loginMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization ?? '').split(' ');

  if (authType !== 'Bearer' || !authToken) {
    return res.status(403).json({ errorMessage: '로그인이 필요한 기능입니다' });
  }

  try {
    const { userId } = jwt.verify(authToken, 'costomized-secret-key');

    const user = await Signup.findById(userId);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ errorMessage: '로그인 후에 이용할 수 있는 기능입니다.' });
  }
};

module.exports = loginMiddleware;
