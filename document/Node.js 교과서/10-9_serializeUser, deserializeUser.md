# 10-9. serializeUser, deserializeUser
- 예제코드
```javascript
const local = require('./localStretegy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
  // req.login 시 serializeUser를 수행 넘어온 user 정보를 받아온다
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.find({where: {id}})
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  local(passport);
  kakao(passport);
};
```

## 1. serializeUser
auth.js router에서 `/login` 호출 시 수행
`req.login` 처리 시 passport의 index.js에 `serializeUser` 호출
유저 정보들 중에 아이디만 세션에 저장

## 2. deserializeUser
매 router 요청 시마다 app.js의 passport.session() 설정 부분에서 `deserializeUser` 를 호출
user.id를 DB조회 후 user 정보를 가져와서 done(null, user)로 넘겨서 req.user에 저장함

`deserializeUser`는 모든 요청에 실행되기 때문에 DB 조회를 캐싱해서 효율적이게 만들어야됨