# 10-6. passport 세팅과 passport-local 전략
## 1. npm 패키지 설치
- passport: 로그인 처리 패키지
- passport-local: 로컬 아이디 로그인 패키지
- passport-kakao: 카카오 인증 패키지
- bcrypt: 비밀번호 암호화 패키지(보통 bcrypt나 scrypt를 많이 사용)
```bash
npm i passport passport-local passport-kakao bcrypt
```

## 2. passport 셋팅
Strategy(전략): 누구를 로그인 시킬 것인가

1. app.js 에 passport 패키지 추가
```javascript
const passport = require('passport');
```

2. passport 폴더 및 파일 추가
`urlencoded` 미들웨어가 해석한 `req.body`의 값들을
`usernameField`, `passwordField`에 연결

- done 에러 콜백 처리
    - done(서버에러)
    - done(null, 사용자 정보)
    - done(null, false, 실패 정보)

- index.js: passport 메인 모듈
```javascript
const local = require('./localStretegy');
const kakao = require('./kakaoStrategy');

module.exports = (passport) => {

  local(passport);
  kakao(passport);
};
```
- kakaoStrategy.js: 카카오 인증 전략
- localStrategy.js: 로컬 로그인 전략
```javascript
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email', //req.body.email
    passwordField: 'password' //req.body.password
  }, async (email, password, done) => { // done(에러, 성공, 실패)
    try {
      const exUser = await User.find({ where: { email }});
      if(exUser) {
        //비밀번호 검사
        const result = await bcrypt.compare(password, exUser.password);
        if(result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (err) {
      console.error(err);
      done(error);
    }
  }));
}
```

1. app.js 에 설정된 passport 모듈 로드
```javascript
const passportConfig = require('./passport');
passportConfig(passport);
```

4. passport 미들웨어 연결
```javascript
app.use(passport.initialize()); //passport 설정 초기화 미들웨어
app.use(passport.session()); //로그인정보를 세션이 저장 express session 설정 보다는 아래에 위치
```

