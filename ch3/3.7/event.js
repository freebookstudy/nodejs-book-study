/**
 * 미리 이벤트리스너를 만들어두고(이벤트 리스너는 특정 이벤트가 발생했을 때 어떤 동작을 할지 정의하는 부분)
 * 예시) 사람들이 서버에 방문(이벤트)하면 HTML 파일을 줄거야
 */

//이벤트를 발생시킬 수 있는 객체
const EventEmitter = require('events')

//이벤트를 마음대로 만들수 있게 해주는 모듈
const myEvent = new EventEmitter();
// addListener(이벤트명, 콜백): on과 기능이 같음
myEvent.addListener('방문', () => {
    console.log('방문해주셔서 감사합니다.');
})
//addListener 과 on은 역할이 같음
// on(이벤트명, 콜백): 이벤트 이름과 이벤트 발생 시의 콜백을 연결해줌. 이렇게 연결하는 동작을 이벤트 리스닝이라고 부름
// event2 처럼 이벤트 하나에 이벤트 여러 개를 달아줄 수도 있음
myEvent.on('종료', () => {
    console.log('안녕히가세요.');
})
myEvent.on('종료', () => {
    console.log('제발 좀 가세요');
})
// once(이벤트명, 콜백): 한 번만 실행되는 이벤트임. myEvent.emit('event3')을 두 번 연속 호출했지만 콜백이 한 번만 실행 됨
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
// removeAllListeners(이벤트명): 이벤트에 연결된 모든 이벤트 리스너를 제거. event4가 호출되기 전에 리스너를 제거했으므로 event4의 콜백은 호출되지 않음
myEvent.removeAllListeners('계속'); //한번에 on 된 Listeners 모두 종료
// emit(이벤트명): 이벤트를 호출하는 메서드. 이벤트 이름을 인자로 넣어주면 미리 등록해뒀던 이벤트 콜백이 실행됨
myEvent.emit('계속');

const callback = () => {
    console.log('제발 좀 가세요');
}

myEvent.on('종료1', () => {
    console.log('안녕히가세요.');
})
myEvent.on('종료1', callback);

// removeListener(이벤트명, 리스너): 이벤트에 연결된 리스너를 하나씩 제거. 역시 event5의 콜백도 호출되지 않음
myEvent.removeListener('종료1', callback); //종료1 Listener 가 여러개이므로 그중 지우고 싶은 Listener를 callback로 받아 지움
myEvent.emit('종료1');

// listenerCount(이벤트명): 현재 리스너가 몇 개 연결되어 있는지 확인
console.log(myEvent.listenerCount('종료1'));

// off(이벤트명, 콜백): 노드10 버전에서 추가된 메서드로, removeListener와 기능이 같음