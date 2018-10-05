# 익스프레스로 만들어보는 SNS 서비스

## 1. 기본환경 셋팅
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
5. nodemon 설치
서버 코드가 바뀔 때 알아서 재시작을 해줌
```bash
npm i -D nodemon
npm i -g nodemon
```

사용법
```bash
nodemon filename
```

6. express 및 기본 필수 모듈들 설치
- express
- cookie-parser
- express-session
- morgan
- connect-flash
- pug
```bash
npm i express cookie-parser express-session morgan connect-flash pug
```

7. app.set app.get
app.set 한 것을 app.get으로 가져올 수 있다
```javascript
app.set('port', process.env.PORT || 8001);
app.listen(app.get('port'), () =>{
  console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
})
```

8. app.js에 선언한 기본 폴더 views, public 생성하면 자동으로 참조됨

9. 보안 처리를 위해 dotenv 설치
```bash
npm i dotenv
```
설치 후 최상위에 `.env` 파일 생성  
보안에 신경써야될 정보들을 `.env`에 정의함
```dotenv
COOKIE_SECRET=nodebirdsecret
PORT=8001
```
소스코드를 저장소에 올릴때 `.env`파일은 `.gitignore`에 추가하면 보안정보가
노출될 위험이 없음

10. 라우터 작성

11. views 폴더에 front pug 파일 카피

12. public 폴더에 main.css 카피

13. app.js 에 router 파일 require 및 에러예외처리

14. models 폴더의 index.js 파일 정리

15. models에 model정의
user.js, hashtag.js, post.js 파일 생성  

- model 정의 예시
```javascript
module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
);
```

provider: local 인지 kakao 가입인지 구분
- timestamps: sequelize가 자동으로 row 생성일, 수정일을 기록해줌
paranoid: 삭제일(복구용)을 기록해줌
```
 timestamp: true,
 paranoid: true
```

16. 일대다 다대다 관계 설정
- 1:1(일대일) - One to One
주가되는 조건이 앞으로 나와야됨
```javascript
//사용자가 Post 게시글을 가지고 있다
db.User.hasOne(db.Post);
//Post 게시글은 사용자에 속해있다
db.User.belongsTo(db.User);
```

- 1:N(일대다) - One to Many 의 관계
hashMany, belongsTo
```javascript
//한명의 유저에 여러개의 Post N:M 관계
db.User.hashMany(db.Post);
db.Post.belongsTo(db.User);
```

- Post 일대다 관계 예시
N:M(다대다) - Many to Many 관계는 belongsToMany(belongsTo가 아님)
through에는 새로 생기는 모델 이름을 넣어줌(매칭 테이블)
다대다는 순서가 상관이 없음
```javascript
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});
```

- 팔로워 팔로잉 관계 예시
같은 테이블 끼리도 다대다 관계가 성립됨
as: 매칭 모델 이름  
foreignKey: 상대 테이블 아이디
A.belongsToMany(B, { as: 'Bname', foreignKey: 'A_id'})
```javascript
//일반인
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
//유명인
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Following', foreignKey: 'followerId' });
```

- 좋아요 다대다 관계 예시
```javascript
db.User.belongsToMany(db.Post, { through: 'Like' });
db.Post.belongsToMany(db.User, { through: 'Like' });
```

