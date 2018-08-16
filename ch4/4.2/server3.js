const http = require('http');

// CREDIT: 유인동님이 알려주신 함수
// 객체로 파싱해줌
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http.createServer((req, res) => {
    console.log(req.url, parseCookies(req.headers.cookie));
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end('<h1>Hello Cookie</h1>');
}).listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기중입니다.');
});
server.on('error', (error) => {
    console.error(error);
})