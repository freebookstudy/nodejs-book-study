const timeout = setTimeout(() =>{
    console.log('1.5초 후 실행');
}, 1500);

const interval = setTimeout(() => {
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => { //2.5초 뒤에 interval, timeout2 취소
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);