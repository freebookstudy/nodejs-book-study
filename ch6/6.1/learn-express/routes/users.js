const express = require('express');
const router = express.Router();

//GET /users/
router.get('/', (req, res) => {
  console.log('네 번째 라우터 미들웨어');
  res.send('Hello users');
});

//DELETE /users/
router.delete('/', (req, res) => {

})

module.exports = router;
