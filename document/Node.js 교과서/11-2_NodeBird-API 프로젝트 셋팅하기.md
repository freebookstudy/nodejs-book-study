## nodebird 일부 폴더 및 파일 복사 재사용
config, models, passport, routes, .env

## views 폴더 생성
error.pug 생성

- bcrypt : 패스워드 암호화 및 비교 모듈
- connect-flash : 1회성 메세지 출력시 사용
- cookie-parser : 쿠키를 파싱하는 모듈
- dotenv : `.env`파일의 설정값을 사용하기 위한 모듈
- express : express 를 사용하기 위한 모듈
- express-session : express session 을 사용하기 위한 모듈
- morgan : 로그 모듈
- mysql2 : MySQL 모듈
- passport : 로그인 인증을 위한 모듈
- passport-local : 로컬 로그인 인증을 위한 모듈
- passport-kakao : 카카오 인증을 위한 모듈
- pug : 뷰 pug 모듈
- sequelize : MySQL ORM 모듈
- uuid : 사용자 고유값 생성 모듈
- nodemon : 자동 변경감지 서버 기동 

npm i bcrypt connect-flash cookie-parser dotenv express express-session morgan mysql2 passport passport-local passport-kakao

npm i pug sequelize uuid

## nodemon 설치
npm i -D nodemon
npm i -g nodemon

## sequelize validate 추가
데이터가 올바르게 들어왔는지 검사
```javascript
{
    validate: {
      unknownType() {
        console.log(this.type, this.type !== 'free', this.type !== 'premium');
        if (this.type !== 'free' && this.type !== 'premium') {
          throw new Error('type 컬럼은 free나 premium이어야 합니다.');
        }
      },
    },
    timestamps: true,
    paranoid: true,
  }
```