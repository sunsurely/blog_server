const express = require('express');
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const contentsRouter = require('./routes/comments');
const app = express();
const port = 3000;

const connect = require('./schemas');
connect();

app.use(express.json());
app.use('/', [indexRouter, postsRouter, contentsRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다!');
});
