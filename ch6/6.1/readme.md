## express-generator 설치
```bash
npm i -g express-generator
```

## express 패키지 만들기
```bash
express learn-express --view=pug
```
--view=pug
HTML대신에 Template엔진으로 pug를 사용하겠다는 옵션임

## express unresolved 오류 안나게 하기
```bash
npm i --save-dev @types/express
``` 

## npm start
원래 `npm run start` 라고 입력해야되지만
`npm start` 만 입력해도됨

## express
- `bin/www` 가 서버 실행부 핵심로직은 `app.js`

## 자주쓰는 모듈
- express-session
- connect-flash

### app.set
express의 설정을 하는 메서드

## 미들웨어
### app.use
`app.use` 안의 `req`,`res`로 요청과 응답을 조작할 수 있음
`next`로 다음 미들웨어로 넘어감
`use`는 모든 경우에 다 적용되는 공통 미들웨어

모듈에 `next`가 없는 이유는 모듈의 함수안에 `next`가 이미 포함되어있음

`app.use`,`app.get`,`app.post`... 에 아래와 같이 연달아 쭉 미들웨어들을 나열해서 적용할 수도 있음
```javascript
app.use((req, res, next) => {
  console.log('첫 번째 미들웨어');
  next();
}, (req, res, next) => {
  console.log('두 번째 미들웨어');
  next();
})
```

- 50% 확률로 라우터 수행 하는 로직
`next`를 `if`문으로 분기하면 요청에서 응답까지 가는 흐름을 마음대로 조정할 수 있음
```javascript
app.use((req, res, next) => {
  console.log('첫 번째 미들웨어');
  //앞에 +를 붙이면 Timestamp 형식을 변경해줌 1970년부터 지나온 밀리초로 보여짐
  if (+new Date % 2 === 0){
    next();
  } else {
    res.send('50% 당첨');
  }
}, (req, res, next) => {
  console.log('두 번째 미들웨어');
  next();
});
```

### next
미들웨어에서는 `next`를 호출해 다음 미들웨어로 넘어가거나
`res.send` 등으로 응답을 보냄
의도적으로 `next`를 안쓰는 경우도 있음
`next(error)`를 하면 다음 미들웨어를 다 건너뛰고 에러처리 미들웨어로 이동함

- 의도적 에러 발생 로직
```javascript
router.get('/', (req, res, next) => {
  console.log('세 번째 라우터 미들웨어');
  try {
    throw new Error('서버를 고장내주마');
  }catch (error) {
    next(error); //모든 미들웨어 다 건너뛰고 바로 에러처리 미들웨어로 이동함
  }
})
```

### res.status().send
res.send 사용시 생략해도 자동으로 200을 붙여서 처리하게 됨
express 5 버전에서는 200을 입력하는 것을 강제화할 예정이라고 함

### 404 NOT FOUND 처리
`next`도 하지 않고 `res` 메서드도 사용하지 않으면 client는 계속 기다리게 됨(무한로딩)
(실제로는 timeout될때까지)
express에서는 writeHead(404) 대신
status(404)를 사용함
404 처리 미들웨어와 에러처리 미들웨어는 끝에 배치함
```javascript
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
})
```

- express-generator에서는 `http-errors` 미들웨어로 에러를 처리함
```javascript
const createError = require('http-errors');
const express = require('express');
const app = express();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
```

### 500 에러 처리 
500 에러 처리 시에는 err을 가장 앞에 둠
```javascript
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('SERVER ERROR');
})
```

### app.get app.post
`app.get`, `app.post` 등은 `GET`,`POST`요청들에만
걸리는 미들웨어를 장착함
주소가 붙으면 그 주소와 일치하는 요청만 걸림
특수한 경우에만 적용되는 미들웨어(일치하는 경우만 실행)
`get`,`post`,`put`,`patch`,`delete` 등은 라우팅 미들웨어를 장착

### app.option
`CORS` 설정 시 사용

## cookieParser - express-session 사용법

```javascript
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser('secret code')); //cookie 파싱 미들웨어
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret:'secret code',
  cookie: {
    httpOnly: true,
    secure: false
  }
}))
```
### cookieParser 의 `secret code` 설정
1. cookie가 client에 저장됨
2. 서버가 응답으로 `setCookie Headers`를 보내면 client에 쿠키가 저장됨
3. cookie가 서버가 저장하라고 한 것인지 위조된 것인지 확인하기 위해 `secret code`와 같은 비밀키가 필요
4. `secret code`라는 비밀키를 두고 client에 cookie를 저장하라고 하고 client가 server로 cookie를 보내준다
5. client에서 넘어온 cookie의 `secret code`가 일치하면 올바른 cookie라고 하고 아니면 무시함
6. 일종의 비밀번호와 같음 노출이 되면 안됨

### express-session 설정
express-session은 메모리에 session을 저장하므로 서버재시작시 소멸함
 
1. 요청이 들어올때마다 수행됨
2. session ID를 cookie로 사용함
3. `secret`에 cookie의 `secret code`를 적용
4. `saveUnitialized`가 `true`이면 요청이 들어올때 마다 처음의 빈 session 객체라도 session을 무조건 저장함 (default 값은 `false`)
5. `resave`가 `true`이면 session 객체에 수정 사항이 없더라도 무조건 재저장함 (default 값은 `false`)
6. `cookie`의 `httpOnly`로 할 것인지 `secure`로 할것인지 설정 `secure`는 `HTTPS`설정을 말함

## connect-flash

```javascript
const flash = require('connect-flash');

app.use(flash());
```
일회성 메세지들을 표시해주는 미들웨어

## require 경로의 index
require 경로에서 index는 생략 가능 함
require('./routes/index')
require('./routes')

## VIEW 템플릿
### pug
pug는 들여쓰기로 부모 자식 태그를 구분
들여쓰기는 탭이든 스페이스든 상관없지만 하나로 통일해야 함

#### pug 설정 로직
```javascript
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```

#### pug 작성 예시
속성은 () 안에, div는 생략가능, 내용은 태그 한 칸 띄고 작성
아이디는 #, 클래스는 ., |로 여러 줄, 태그도 중간에 넣을 수 있음

if, else if, else를 쓸 수 있음
if not의 unless도 가능함
for 아이템, 인덱스 in (모두 들여쓰기가 중요)

웹페이지에서 중복되는 부분은 include나 layout으로 해결함
```html
doctype html
html
  head
    //- 입력시 javascript 입력 가능
    // -const title = '익스프레스'
    // -const title2 = '안녕'
    //변수사용이 가능
    title= title + ' ' + title2
    link(rel='stylesheet', href='/stylesheets/style.css')
    body
      p pug Template TEST
```

#### pug render 로직
아래와 같이 render 메서드에 변수를 입력할 수 있음
렌더링은 HTML로 됨
```javascript
router.get('/', (req, res, next) => {
  console.log('세 번째 라우터 미들웨어');
  //변수를 render 메서드에서 입력해 줄 수도 있음
  res.render('test', {
    title: '익스프레스',
    title2: '안녕'
  });
})
```

