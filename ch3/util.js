const util = require('util');
const crypto = require('crypto');

const dontuseme = util.deprecate((x, y) => {
    console.log(x + y);
}, '이 함수는 2018년 12월 부로 지원하지 않습니다.');

dontuseme(1,2);

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