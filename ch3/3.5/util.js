const util = require('util');
const crypto = require('crypto');

// 함수가 deprecated 처리되었음을 알려줌. 첫 번째 인자로 넣은 함수를 사용했을 때 경고 메시지가 출력됨
// 두 번째 인자로 경고 메시지 내용을 넣으면 됨. 함수가 조만간 사라지거나 변경될 때 알려줄 수 있어 유용함
const dontuseme = util.deprecate((x, y) => {
    console.log(x + y);
}, '이 함수는 2018년 12월 부로 지원하지 않습니다.');
//'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!

dontuseme(1,2);

// 콜백 패턴을 프로미스 패턴으로 바꿔줌. 바꿀 함수를 인자로 제공하면 됨
// 이렇게 바꾸어두면 async/await 패턴까지 사용할 수 있어 좋음
// randomBytes와 비교. 프로미스를 콜백으로 바꾸는 util.callbackify도 있지만 자주 사용되지는 않음
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt', salt);
    console.time('암호화');
    crypto.pbkdf2('연미바보', salt, 65139, 64, 'sha512', (err, key) => {
        console.log('password', key.toString('base64'));
        console.timeEnd('암호화');
    });
});

randomBytesPromise(64)
    .then((buf) => {
        const salt = buf.toString('base64');
        return pbkdf2Promise('연미바보', salt, 651395, 64, 'sha512');
    })
    .then((key) => {
        console.log('password', key.toString('base64'));
    })
    .catch((err) => {
        console.error(err);
    })

{
    async () => {
        const buf = await randomBytesPromise(64);
        const salt = buf.toString('base64');
        const key = pbkdf2Promise('연미바보', salt, 651395, 64, 'sha512');
        console.log('password', key, toString('base64'));
    }
}