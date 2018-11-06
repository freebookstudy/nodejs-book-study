## 초기화
```javascript
new RSMQWorker( queuename, options );
```

### 기본예제
```javascript
  var RSMQWorker = require( "rsmq-worker" );
  var worker = new RSMQWorker( "myqueue" );

  worker.on( "message", function( msg, next, id ){
  	// process your message
  	console.log("Message id : " + id);
  	console.log(msg);
  	next()
  });

  // optional error listeners
  worker.on('error', function( err, msg ){
      console.log( "ERROR", err, msg.id );
  });
  worker.on('exceeded', function( msg ){
      console.log( "EXCEEDED", msg.id );
  });
  worker.on('timeout', function( msg ){
      console.log( "TIMEOUT", msg.id, msg.rc );
  });

  worker.start();
```

## RedisSMQ 구동 예시
```javascript
RedisSMQ = require("rsmq");
rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
```

## Redis에 데이터 적재 구조
- `rsmq` 위에서 RSMQ가 만든 모든 키에 사용 된 이름 공간 접두사를 정의 한것
- QUEUE 명: SET rsmq:QUEUES
- Message 대기열 Q: ZSET rsmq:myqueue
- myqueue에 대한 설정및 이벤트기록: HASH rsmq:myqueue

### options
- interval: (default = [ 0, 1, 5, 10 ]) - 증가대기시간 배열
- maxReceiveCount: (default = 10) - 허용하는 개수를 초과된 메세지는 삭제함
- autostart: (default = false) - true로 주면 init시 자동시작됨
- timeout: 