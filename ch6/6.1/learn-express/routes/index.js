const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('세 번째 라우터 미들웨어');
  // res.send('정상 라우터');
  //변수를 render 메서드에서 입력해 줄 수도 있음
  res.render('test2', {
    title: '익스프레스',
    title2: '안녕',
    fruits: ['사과', '배', '오렌지']
  });
  /*
  try {
    throw new Error('서버를 고장내주마');
  }catch (error) {
    next(error); //모든 미들웨어 다 건너뛰고 바로 에러처리 미들웨어로 이동함
  }
  */
})

router.post('/', (req, res) => {

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
