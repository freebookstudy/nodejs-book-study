var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ejs', fruits: ['사과','배', '오렌지'] });
});

module.exports = router;
