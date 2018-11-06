## 성능 테스트 도구
- JAVA 성능 테스트 도구
Jmeter

- URL 별로 테스트 가능
Apache Bench

- 사용자 시나리오로 작성
- 대량 트래픽 조절 가능
- 가능하면 Node.js로 사용

## Artillery
ARTILLERY.IO 회사 Node.js로 작성된 부하 테스트 도구 사용
YML 파일로 작성 config애서 서버URL, 부하주는 방법들을 설정
- config 작성 예시
```yaml
config:
  target: 'http://localhost:3000'
  http:
    timeout: 20
  phases:
    -
      duration: 240
      arrivalCount: 8
      name: "Warm-up"
    -
      duration: 240
      arrivalCount: 24
    -
      duration: 240
      arrivalCount: 48
    -
      duration: 600
      arrivalCount: 150
    -
      duration: 240
      arrivalCount: 48
    -
      duration: 240
      arrivalCount: 24
  processor: "./processor.js"
  payload:
    path: './payload.csv'
    fields:
- 'email'
      - 'password'
    order: 'sequence'
```

```yaml
duration: 240
arrivalCount: 24
```
240초동안 24 유저(시나리오)를 생성
-> 4분동안 10초에 한명씩 새로운 유저를 생성

### 시나리오 작성
- 시나리오 작성예시
사나리오대로 수행되도록 순서대로 테스트 케이스 작성

```yaml
scenarios:
- name: ‘사용자 흐름'
flow:
# 회원 가입 - post:
          url: '/signup'
          json:
            email: '{{ email }}'
password: '{{ password }}' # 로그인
      - post:
          url: '/login'
          json:
            email: '{{ email }}'
            password: '{{ password }}'
          capture:
            - json: '$.data.token'
as: 'token' # 정보조회
      - get:
          url: '/user/info'
          headers:
Authorization: 'Bearer {{ token }}'
```

#### 테스트 데이터 생성
node.js 로 테스트 데이터 생성 로직 구현 후 테스트 데이터 csv로 생성
```javascript
#!/usr/bin/env node
const fs = require('fs');
const ROWS = process.env.PAYLOAD || 10000;
const FILE_NAME = './test/payload.csv'
fs.writeFileSync(FILE_NAME, '');
for(let i = 0; i < ROWS; i++) {
  const u = generateUser();
  fs.appendFileSync(FILE_NAME, `${u.email},${u.password}\n`);
}
```

### package.json
npm script 작성

```javascript
{
  "scripts": {
    "preloadtest": "./test/generate-payloads",
    "loadtest": "artillery run test/config.yml"
  }
}
```
아래와 같이 수행해서 테스트 하면 더미데이터 생성후  artillery 가 테스트 수행
```bash
$ npm run loadtest
```

테스트를 돌리고 나면 아래와 같이 report 데이터가 생성됨
```bash
artillery report \ artillery_report_20171103_185907.json
```
artillery report 라는 명령으로 돌려주면 HTML 화면으로 출력됨
간단한 부하와 응답시간을 볼 수 있음

## APM(Application Performance Management)
Node.js에서 사용할 수 있는 대표적인 도구는  `New Relic`, `RisingStack`, `NSolid`
대부분 유료임
Naver에서는 PingPoint 사용

### New Relic
성능테스트시 언제 시작하고 끝나는지 알수가 없음
API 요청으로 payload로 json으로 revision, changelog, description, user를 넣고 보내면 배포플래그를 찍음
타임라인에 세로로 선을 그을 수 있음 성능테스트를 시작할떄 한번 찍고 끝날때 한번 찍음
New relic 배포 플러그
```bash
#!/usr/bin/env bash
curl -X POST \
    ’https://api.newrelic.com/v2/applications/APPID/deployments.json' \
    -H ‘X-Api-Key:YOUR_API_KEY’ -i \
    -H 'Content-Type: application/json' \
    -d \
'{
  "deployment": {
    "revision": "1",
    "changelog": "'"${MACHINE_ID} start"'",
    "description": "'"${MACHINE_ID} start"'",
    "user": “YOUR_EMAIL"
} }'
```

npm script에 넣어서 시작할때와 끝날때 마커를 찍음
```javascript
{
  "scripts": {
    "preloadtest": “./test/generate-payloads && ./test/mark-ended.sh",
    "loadtest": "artillery run test/config.yml",
    "portloadtest": "./test/mark-ended.sh"
} }
```

## 테스트 서버 구성
- 클러스터 인스턴스 변경
- 컨테이너 CPU, 메모리 조정
- DB Pool 사이즈 조정

### Node.js 버전 업 성능개선
6.11.5 - V8 5.1.281.108
8.9.0 - V8 6.1.534.46

V8의 컴파일러는 Crankshaft 였다가
5.9 부터는 Ignition + Tubofan 을 사용함

공식적으로는 10% 성능향상 퍼포먼스가 나옴
### 응답속도(Web transactions time)
6.11.5 - 1400ms
8.9.0 - 600ms 이내로 줄어듬

테스트 서버 2대에서는
응답 속도는 늘어났지만 안정성이 좋음
6버전대는 불안정함 제대로 처리를 못함

### Throughput(rpm) 쓰루풋
6.11.5 - 7.5K RPM 처리
8.9.0 - 9K RPM 처리되도록 늘어남

테스트 서버 2대에서는
6.11.5 - 7.5K RPM 처리
8.9.0 - 10K RPM 처리되도록 늘어나서 안정적인 처리

morgan 병목 현상 꺼줘야됨

### node inspect
node V8 에서 부터 inspect 를 지원함
node --inspect YOUR_APP.js

```bash
$ node --inspect ./bin/www
Debugger listening on ws://127.0.0.1:9229/77128b6e-fe32-4da9-a1db
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```

chrome://inspect 로 접근 크롬의 개발자 도구에 inspect 

Frame Chart


 MRTE(Mysql Real Traffic Emulator) 트래픽 테스트

### V8 Tick Profiler
```bash
$ node --prof ./bin/api
```
isolate-0x103800000-v8.log 파일로 떨굼

사람이 읽을수 있겠금 테스트결과를 떨궈줌
```bash
$ node --prof-process isolate-0x103800000-v8.log > processed.txt
dropping: overflow
Code move event for unknown code: 0x2a2f8121cac0
Code move event for unknown code: 0x2a2f8124f9a0
Code move event for unknown code: 0x2a2f81254ae0
```

### Auto cannon
apache bench 와 비슷한 특정 url로 부하를 주는 node 모듈
```bash
 npx autocannon -c 100 -H "Authorization: token" \
  http://localhost:3000/api
```

### Heap Dump
Heap dump의 사이즈 = 메모리 용량
Shallow Size = 객체의 실제 크기
Retained Size = 객체의 레퍼런스가 있으면 이를 포함한 크기