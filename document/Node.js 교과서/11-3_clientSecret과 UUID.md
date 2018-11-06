## 패키지 설치
npm i uuid

## 사용자 고유한 클라이언트 비밀키 생성 UUID
```javascript
const uuidv4 = require('uuid/v4')

router.post('/domain', (req, res, next) => {
  Domain.create({
    userId: req.user.id,
    host: req.body.host,
    type: req.body.type,
    clientSecret: uuidv4(),
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});
```