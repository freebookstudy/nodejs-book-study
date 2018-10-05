const SSE = require('sse');

/**
 * 서버센트 이벤트
 * 서버에서 시간을 내려받기 위한 이벤트
 * @param server
 */
module.exports = (server) => {
  const sse = new SSE(server);
  sse.on('connection', (client) => { // EventSource ServerSentEvents
    setInterval(() => {
      client.send(new Date().valueOf().toString());
    }, 1000);
  })
}