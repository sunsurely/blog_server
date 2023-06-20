const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const signupRouter = require('./signup');
const loginRouter = require('./login');

const defaultRoutes = [
  {
    path: '/posts',
    route: postsRouter,
  },
  {
    path: '/comments',
    route: commentsRouter,
  },
  {
    path: '/signup',
    route: signupRouter,
  },
  {
    path: '/login',
    route: loginRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
