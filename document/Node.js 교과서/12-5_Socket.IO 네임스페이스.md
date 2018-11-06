## 네임스페이스
네임스페이스로 실시간 데이터가 전달될 주소를 구별
기본 네임스페이스는 `/`

## 네임스페이스 구분
- 네임스페이스에 따른 로직 분기처리
```javascript
const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });

  const room = io.of('/room'); //room에 관련된 이벤트만 수신
  const chat = io.of('/chat'); //chat에 관련된 이벤트만 수신

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => { //채팅방에 접속했을 때
    console.log('chat 네임스페이스에 접속');
    const req = socket.request;
    const { headers: { referer } } = req;
    const roomId = referer //req.headers.referer에 웹 주소가 들어있고 거기서 방 아이디를 가져옴
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId); //방에 접속
    socket.to(roomId).emit('join', { //해당 방에만 메세지를 보냄
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });
    socket.on('disconnect', () => { //채팅방에서 나감
      console.log('chat 네임스페이스 접속 해제');
      socket.leave(roomId); //방 나가기
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) {
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('방 제거 요청 성공');
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};

```