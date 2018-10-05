const SocketIO = require('socket.io');

/**
 * 소켓서버
 * 서버센트 이벤트와 통신할 소켓서버
 * @param server
 * @param app
 */
module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });

  app.set('io', io);

  io.on('connection', (socket) => {
    const req = socket.request; //요청 객체 접근
    const { headers: { referer } } = req;
    // req.cookie, req.session등 express 객체에 접근 불가, 접근하려면 io.use 미들웨어를 연결
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket.join(roomId);
    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  });
};
