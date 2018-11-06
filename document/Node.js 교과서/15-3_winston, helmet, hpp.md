# 15-3. winston, helmet, hpp
## 1. winston 설치 및 사용
1. winston 설치
```bash
npm i winston@next
```

2. logger.js 추가
- 지정한 로그가 combined.log 에 기록됨
- error 로그는 error.log 에 기록됨
```javascript
const { createLogger, format, transports } = require('winston');

//logger create
const logger = createLogger({
  level: 'info',
  format: format.json(), // format 형식은 json으로
  transports: [ // 기록방식
    new transports.File({ filename: 'combined.log' }), //combined.log 파일로 기록되도록
    new transports.File({ filename: 'error.log', level: 'error' }), //error은 error.log 파일로 기록되도록
  ],
});

if (process.env.NODE_ENV !== 'production') { //배포환경이 아닐때는
  logger.add(new transports.Console({ format: format.simple() })); //console 에도 기록되도록 함
}

module.exports = logger;
```

3. app.js 에 logger.js 셋팅
- 로그 사용방법은 아래와 같이 지정하고 사용함
```javascript
const logger = require('./logger');

logger.info('hello'); //console.info 대체
logger.error(err.message); //console.error 대체
```

4. 날짜별로 로그 파일을 관리하는 패키지
- 날짜별로 로그 파일하는 추가 패키지 설치
```bash
npm i winston-daily-rotate-file
```

## 2. 보안 패키지 helmet hpp
1. 패키지 설치
```bash
npm i helmet hpp
```

2. app.js 에 추가하여 사용
배포환경에서만 사용
- helmet: 각종 해킹 방어
- hpp: hpp 공격 방어
```javascript
const helmet = require('helmet');
const hpp = require('hpp');

app.use(helmet());
app.use(hpp());
```