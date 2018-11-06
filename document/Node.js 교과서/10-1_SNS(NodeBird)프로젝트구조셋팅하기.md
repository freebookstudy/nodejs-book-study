# 10-1. SNS(NodeBird) 프로젝트 구조 셋팅하기
## 1. 초기셋팅
```bash
$ mkdir nodebird
$ cd mkdir nodebird
$ npm init
```

1. 아래와 같이 셋팅
```json
{
  "name": "nodebird",
  "version": "0.0.1",
  "description": "익스프레스로 만드는 SNS 서비스",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "freelife1191",
  "license": "MIT"
}
```
2. package.json 에 start 스크립트 추가
```
"start": "nodemon app"
```

3. nodemon 설치
    - 소스코드 변경시 자동반영 및 재기동 시켜주는 모듈
    ```bash
    $ npm i -D nodemon
    $ npm i -g nodemon
    ```

    - 사용법
    ```bash
    nodemon filename
    ```

## 2. 기본환경 셋팅
1. MySQL ORM 인 sequelize 와 mysql2 설치
```bash
npm i sequelize mysql2
```

2. sequelize-cli 전역설치
```bash
npm i -g sequelize-cli
```

3. sequelize-cli 사용
자동으로 `config`,`seeders`,`migrations`,`models`를 생성해줌
```bash
sequelize init
```

4. DB 생성설정
  1. config/config.json의 정보를 변경
  ```
  "development": {
      "username": "root",
      "password": "1879asdf",
      "database": "nodebird",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "operatorsAliases": false
    }
  ```
   
  2. MySQL 접속시 경고 메세지 끄기 옵션
  ```
  "operatorsAliases": false
  ```
  
  3. DB 생성
  ```bash
  sequelize db:create
  ```

5. express 및 기본 필수 모듈들 설치
- express
- cookie-parser
- express-session
- morgan
- connect-flash
- pug
```bash
npm i express cookie-parser express-session morgan connect-flash pug
```

6. app.js 수동 생성
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extend: false}));
app.use(cookieParser('nodebirdsecret'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'nodebirdsecret',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash());

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
})
```

- app.set app.get
app.set 한 것을 app.get으로 가져올 수 있다
```javascript
app.set('port', process.env.PORT || 8001);
app.listen(app.get('port'), () =>{
  console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
})
```

- app.js에 선언한 기본 폴더 views, public 생성하면 자동으로 참조됨