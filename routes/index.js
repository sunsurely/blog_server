const express = require('express');
const router = express.Router();
const postsRouter = require('./posts');
const commentsRouter = require('./comments');

const defaultRoutes = [
  {
    path: '/posts',
    route: postsRouter,
  },
  {
    path: '/comments',
    route: commentsRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
