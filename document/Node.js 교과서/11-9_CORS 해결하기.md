## CORS 해결하기
CORS(cross origin resource sharing)
프론트에서 다른 오리진의 서버로 요청을 보내면 에러 발생

Access-Control-Allow-Origin 헤더를 응답 헤더에 넣어주면 됨

CORS 요청 시에는 OPTIONS 메서드 요청이 감
Access-Control-Allow-Origin을 검사

## 프론트 요청 API 추가
```javascript
router.get('/', (req, res) => {
  res.render('main', { key: process.env.CLIENT_SECRET });
});
```

## 프론트 요청 화면 구현
```pug
doctype
html
  head
    title 프론트 API 요청
  body
    #result
    script.
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            document.querySelector('#result').textContent = xhr.responseText;
          } else {
            console.error(xhr.responseText);
          }
        }
      };
      xhr.open('POST', 'http://localhost:8002/v2/token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ clientSecret: '#{key}' }));
```

## API 서버 cors 설정
cors 미들웨어가 응답헤더에 Access-Control-Allow-Origin 헤더를 넣어줘서 문제를 해결

- 서버측 cors 패키지 설치
```bash
npm i cors
```

```javascript
const cors = require('cors');

//모든 경우에 허용
router.use(cors());
```

## 특정 조건일 경우 허용하기
미들웨어 안에 미들웨어를 넣어 커스터마이징이 가능
```javascript
//특정 경우에만 허용하는 경우 아래와 같이
router.use(async (req, res, next) => {
  const domain = await Domain.find({
    where: { host: url.parse(req.get('origin')).host },
  });
  if (domain) {
    cors({ origin: req.get('origin') })(req, res, next);
  } else {
    next();
  }
});
```
