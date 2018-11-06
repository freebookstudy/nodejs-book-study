## Socket.IO
클라이언트 구분, 채팅방 기능 미리 구현된 패키지
웹소켓을 기반으로 채팅방기능 클라이언트가 누군지 IP구분

## 설치
```bash
npm i socket.io
```
## Socket.IO 이벤트
- connection : 커넥션 열결 시(실시간채팅방 서버에 접속할때 마다 커넥션 이벤트가 발생)
- error : 에러발생시
- disconnect : 접속종료시
- reply : 임의 설정 메세지 답장 받을때

## Socket.IO 셋팅
```javascript
const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.io' }); //클라이언트에서 이 PATH로 접근하면 연결됨

  io.on('connection', (socket) => { //socket 만 있음
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip); //socket.id로 클라이언트 구분
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO'); //ws.send 대신 socket.emit(key,value) 형태로 메세지 전송
    }, 3000);
  });
};
```

## views/index.pug 클라이언트
Socket.IO는 처음에 HTTP 요청으로 웹소켓 사용 가능 여부를 물음
```pug
doctype
html
  head
    meta(charset='utf-8')
    title GIF 채팅방
  body
    div F12를 눌러 console 탭과 network 탭을 확인하세요.
    script(src='/socket.io/socket.io.js') //서버측 PATH 와 일치 해야됨
    script.
      var socket = io.connect('http://localhost:8005', {
        path: '/socket.io',
        transports: ['websocket'] //transports 는 처음부터 바로 websocket을 연결함 사용가능 여부를 물으려면 제거
      });
      socket.on('news', function (data) { //news 키로 보낸 메세지를 받음
        console.log(data);
        socket.emit('reply', 'Hello Node.JS'); //reply 키로 메세지 전송
      });

```