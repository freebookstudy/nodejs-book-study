## color-hash app.js 에 추가
익명 사용자를 컬러로 구분하기 위한 패키지

```javascript
const ColorHash = require('color-hash');

app.use((req, res, next) => {
  if (!req.session.color) { //세션에 color 값이 없을떄
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID); //임의로 color 값을 배정해줌
  }
  next();
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server, app) //웹소켓으로 app을 전달해줌
```

## express 변수 저장 방법
`app.set('io',io)`로 저장 후
`req.app.get('io')`로 꺼내서
`req.app.get('io').of('/room').emit` 로 메세지를 보낼 수 있음

```javascript
module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');
```

## Socket.IO에서 미들웨어 사용
Socket.IO에서도 미들웨어를 사용할 수 있음
use 안에 (req, res, next)를 붙여주면 됨

- app.js에서 session 공유설정
```javascript
require('dotenv').config();
const session = require('express-session');

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});
app.use(sessionMiddleware);

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

webSocket(server, app, sessionMiddleware);
```

- socket.js 에서 공유된 session 받기
```javascript
module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  //익스프레스 미들웨어를 Socket.IO에서 사용하는 방법
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });
```

## 방이 하나도 없을때 DB에서 방 데이터를 제거 chat io에 구현
```javascript
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId); //방 나가기
      // 방에 인원이 하나도 없으면 방을 없앰
      const currentRoom = socket.adapter.rooms[roomId]; //방 정보와 인원이 들어 있음
      const userCount = currentRoom ? currentRoom.length : 0; //현재 사용자수
      if (userCount === 0) { //현재 사용자가 없으면 방 데이터 제거 요청 
        //Room.remove({_id: req.params.id }); //바로 제거 가능 하지만 라우터를 통해 DB를 컨트롤 해야됨
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else { //방에 사용자가 남아 있으면 사용자들에게 누가 나갔는지 알려줌
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
```