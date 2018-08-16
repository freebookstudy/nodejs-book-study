/**
 * 미리 이벤트리스너를 만들어두고(이벤트 리스너는 특정 이벤트가 발생했을 때 어떤 동작을 할지 정의하는 부분)
 * 예시) 사람들이 서버에 방문(이벤트)하면 HTML 파일을 줄거야
 */

//이벤트를 발생시킬 수 있는 객체
const EventEmitter = require('events')

//이벤트를 마음대로 만들수 있게 해주는 모듈
const myEvent = new EventEmitter();
myEvent.addListener('방문', () => {
    console.log('방문해주셔서 감사합니다.');
})
//addListener 과 on은 역할이 같음
myEvent.on('종료', () => {
    console.log('안녕히가세요.');
})
myEvent.on('종료', () => {
    console.log('제발 좀 가세요');
})
myEvent.once('특별이벤트', () => {
    console.log('한 번만 실행됩니다');
})
// myEvent.emit('방문');
// myEvent.emit('종료');
// myEvent.emit('특별이벤트');
// myEvent.emit('특별이벤트');
myEvent.on('계속', () => {
    console.log('계속 리스닝');
})
myEvent.removeAllListeners('계속'); //한번에 on 된 Listeners 모두 종료
myEvent.emit('계속');

const callback = () => {
    console.log('제발 좀 가세요');
}

myEvent.on('종료1', () => {
    console.log('안녕히가세요.');
})
myEvent.on('종료1', callback);

myEvent.removeListener('종료1', callback); //종료1 Listener 가 여러개이므로 그중 지우고 싶은 Listener를 callback로 받아 지움
myEvent.emit('종료1');
console.log(myEvent.listenerCount('종료1'));