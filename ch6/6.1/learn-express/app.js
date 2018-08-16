const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev')); //요청과 응답을 표시해주는 미들웨어
app.use(express.static(path.join(__dirname, 'public'))); //정적 파일을 가져오는 미들웨어

app.use(express.json()); //express json 파싱 모듈
app.use(express.urlencoded({ extended: false })); //express urlencode 정의 모듈
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
app.use(flash());

app.use((req, res, next) => {
  console.log('첫 번째 미들웨어');
  //앞에 +를 붙이면 Timestamp 형식을 변경해줌 1970년부터 지나온 밀리초로 보여짐
 /*
  if (+new Date % 2 === 0){
    next();
  } else {
    res.send('50% 당첨');
  }*/
  next();
}, (req, res, next) => {
  console.log('두 번째 미들웨어');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

//404 NOT FOUND
app.use((req, res, next) => {
  res.status(404).send('NOT FOUND');
})

//500 Error
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send('SERVER ERROR');
})

app.use
module.exports = app;