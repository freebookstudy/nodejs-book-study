// (문자열) 문자열을 버퍼로 바꿀수 있음. length 속성은 버퍼의 크기를 알려줌. 바이트 단위
const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
// (버퍼) 버퍼를 다시 문자열로 바꿈. 이때 base64 나 hex를 인자로 넣으면 해당 인코딩으로 변환할 수 있음
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
// (배열) 배열 안에 든 버퍼들을 하나로 합침
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

// (바이트) 빈 버퍼를 생성. 바이트를 인자로 지정해주면 해당 크기의 버퍼가 생성
const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
