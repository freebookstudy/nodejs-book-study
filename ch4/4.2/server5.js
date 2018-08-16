const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

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

const session = {

};

const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url); //url query 파싱
        const { name } = qs.parse(query); // 파싱된 query 에서 name을 파싱
        const randomInt = +new Date(); //앞에 +를 붙이면 Timestamp 형식을 변경해줌 1970년부터 지나온 밀리초로 보여짐
        const expires = new Date();
        session[randomInt] = {
            name,
            expires,
        }
        expires.setMinutes(expires.getMinutes() + 5); //Cookie의 유효시간은 현재시간으로부터 5분뒤로 설정
        console.log(name);
        // name에 입력한 이름을 저장
        // Expires는 Cookie의 유효시간이 지나면 무효가됨 서버로 보내더라도 유효시간이 지나면 알아서 그 Cookie를 사용하지 않음
        // HttpOnly는 Javascript에서 Cookie에 접근할 수 없는 옵션
        // path=/  / 경로에서만 유효한 Cookie
        // res.writeHead(200, {
        res.writeHead(302, { //302는 다른 페이지로 보내는 옵션
            Location: '/', //302일 경우 이동시킬 경로 설정
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        //클라이언트에 name을 Cookie로 삼으라는 명령과 함께 응답을 보냄
        res.end();
    } else if(cookies.session && session[cookies.session] && session[cookies.session].expires > new Date()) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); //이 옵션을 하면 한글이 제대로 보임
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        fs.readFile('./server5.html', (err, data) => {
            res.end(data);
        })
    }
}).listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기중입니다.');
});
server.on('error', (error) => {
    console.error(error);
})