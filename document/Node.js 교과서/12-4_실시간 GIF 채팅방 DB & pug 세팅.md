## 실시간 채팅방 구현

## 패키지 설치
- mongoose : MongoDB ODM
- multer : 파일 업로드
- axios : HTTP 통신을 위한 패키지
- color-hash : 사용자 이름에 색깔을 부여할 수 있음
npm i mongoose multer axios color-hash

## schemas/room.js 방만들기 스키마 추가
```javascript
const mongoose = require('mongoose');

const { Schema } = mongoose;
const roomSchema = new Schema({
  title: { //방제목
    type: String,
    required: true,
  },
  max: { //최대허용인원
    type: Number,
    required: true,
    default: 10,
    min: 2,
  },
  owner: { //방장
    type: String,
    required: true,
  },
  password: String, //비밀번호 설정
  createdAt: { //생성일
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Room', roomSchema);
```

## schemas/chat.js 채팅을 위한 스키마
```javascript
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const chatSchema = new Schema({
  room: {
    type: ObjectId,
    required: true,
    ref: 'Room',
  },
  user: {
    type: String,
    required: true,
  },
  chat: String,
  gif: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);
```

## schemas/index.js mongoose 커넥션
```javascript
const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports = () => {
  const connect = () => {
    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect(MONGO_URL, {
      dbName: 'gifchat', //DB명
    }, (error) => {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    });
  };
  connect();

  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
  });

  require('./chat'); //채팅 스키마 연결
  require('./room'); //방만들기 스키마 연결
};
```

## app.js 에 connect 추가하여 mongodb connection
```javascript
const connect = require('./schemas');

connect();
```

## css 및 front 파일 생성
public/main.css
views/layout.pug
views/room.pug
views/chat.pug