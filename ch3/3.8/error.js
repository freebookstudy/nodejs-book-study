const fs = require('fs')

/*
setInterval(() => {
    console.log('시작');
    fs.unlink('./asdfasdf.js', (err) => {
        if(err){
            console.log('시작');
            console.log(err);
            console.log('끝');
        }
    })
}, 1000);
*/

//uncaughtException 예외처리 이벤트 지정시
//처리하지 않은 예외 catch로 안잡아준 것들 throw 로 지정된 예외를 한 번에 모아서 처리해줌
//모든 에러를 처리할 수 있기는 하지만 그 에러가 계속 발생하게 됨 근본적인 해결책은 아님
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
    //서버를 복구하는 코드를 넣은 경우를 봤으니 이 코드가 실행되리라는 확실한 보장이 되지않음
})

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다');
}, 2000);
