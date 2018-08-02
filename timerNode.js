//즉시 실행되는 setImmediate 함수를 이벤트 루프로 보낼 때 사용
const im = setImmediate(() => console.log('즉시 실행'));
// clearImmediate(im);

//파일 이름 가져오기
console.log(__filename);
//디렉토리 이름 가져오기
console.log(__dirname);

for (let i = 0; i < 100000; i++) {
    console.log(i);
    process.exit();
}