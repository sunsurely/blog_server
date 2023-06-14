const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('wellcome');
});

module.exports = router;
