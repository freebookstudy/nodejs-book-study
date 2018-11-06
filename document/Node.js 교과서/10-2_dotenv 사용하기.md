## dotenv 설치
> dot(.) + env 여서 dotenv 임
> `.env` 파일에 키=값 형식으로 비밀번호를 저장
> `.env` 파일에서만 중요한 보안정보를 관리하므로 관리 포인트가 줄어듬
> `.env` 파일은 업로드 하지 않고 `.gitignore` 에 등록시켜 놓음
```bash
npm i dotenv
```

- `.env` 파일 내용
```env
COOKIE_SECRET=nodebirdsecret
PORT=8001
```

- `app.js`에 적용
> 아래와 같이 작성하면 `.env`의 설정내용이 `process.env`에 적용됨
```javascript
require('dotenv').config();
```

- `process.env` 사용예시
```javascript
app.set('port', process.env.PORT || 8001);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
```