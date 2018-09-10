# 스스로 해보기 3

## 데이터베이스와 연동하여 가게부 만들어보기

## 1. 기본환경 셋팅]
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
      "database": "nodewallet",
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

- models 내에 자동생성된 index.js 수정

5. 명령어를 여러개 등록해도 됨
bin에 등록 후 -g 재설치
```
 "bin": {
    "cli": "./command.js",
    "wlt": "./wallet.js"
  }
```
5. Version 표기
package.json의 기본 Version 정보를 받아올 수 있다
```javascript
const { version } = require('./package');

.version(version, '-v, --version')
```

6. DB 연결
sequelize 로 구현하며 DB연결 부와 종료부를 추가한다
sync - DB 연결 및 DB 컬럼 동기화
close - DB 연결 종료
```javascript
const { sequelize, Wallet } = require('./models');
  
  
 .action(async () => {
    await sequelize.sync();
    await sequelize.close();
  });

```

7. logging 끄기
config.json 옵션에 추가
```
  "logging": false
```

8. 대화형 command inquirer
inquirer의 when 옵션이 있음
https://github.com/SBoudrias/Inquirer.js#objects

- inquirer 적용
```javascript
const inquirer = require('inquirer');

//대화형 command를 위한 inquirer을 위한 trigger 변수
let triggered = false;

//inquirer을 사용하지 않아도 되면 아래와 같이 ture를 주면됨
//수입
program
  .command('revenue <money> <desc>')
  .description('수입을 기록합니다.')
  .action(async (money, desc) => {
    await sequelize.sync();
    await Wallet.create({
      money: parseInt(money, 10),
      desc,
      type: true
    });
    console.log(`${money}원을 얻었습니다.`);
    await sequelize.close();
    triggered = true;
  });
```


