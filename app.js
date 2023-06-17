const express = require('express');
const connect = require('./schemas');
const routes = require('./routes');

const app = express();
const port = 3000;

connect();

app.get('/app', (req, res) => {
  res.send('환영합니다!');
});

app.use(express.json());
app.use('/app', routes);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸습니다!');
});
