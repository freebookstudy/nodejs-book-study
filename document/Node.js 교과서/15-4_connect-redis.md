# 15-4. connect-redis
## 1. connect-redis 사용
서버 재시작 시 사라지는 휘발성 세션 정보를 Redis에 저장 로드밸런싱 서버간 세션공유 등으로 사용
사용량 제한 패키지인 express-rate-limit 를 rate-limit-redis 패키지로 레디스에 저장하여 사용할 수 있음

1. connect-redis 패키지 설치
```bash
npm i connect-redis
```

1. redis 무료 호스팅 사용
https://app.redislabs.com 가입 후 1개까지 무료로 사용 가능

Configuration 에서 Endpoint 주소를 가져와서 사용

- `.env` 에 호스팅 정보 셋팅
```
REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
```

3. app.js 에 셋팅
```javascript
//express session 을 RedisStore에 담는다
const RedisStore = require('connect-redis')(session);

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  //RedisStore 호스팅 정보 셋팅
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pass: process.env.REDIS_PASSWORD,
    logErrors: true, //에러시 에러 기록
  }),
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
```