## pm2 설치
```bash
npm i pm2
npm i -g pm2
```

## pm2 명령어
pm2 start 시 기본으로 fork mode 로 실행됨
- pm2 list : pm2 리스트 보기
- pm2 restart all : pm2 모듈 모두 재시작
- pm2 monit : 실시간 서버 현황 모니터링
- pm2 kill : 서버 다운
- pm2 start app.js : 서버 기동

## pm2 멀티코어 활용
설정된 코어 수만큼 서버 생성해서 멀티코어를 활용 하여 cluster mode로 서버 생성
0 : 자동으로 코어수만큼 서버를 생성
1 : 코어를 하나만 생성
-1 : 최대코어에서 -1을 한 만큼 서버생성
- pm2 start app.js -i 0


## 운영실행 스크립트 생성
- pm2 start app.js -i 0 으로 실행하면서 NODE_ENV=production 에 PORT=80 을 설정 
- Windows 에서도 되게 하려면 cross-env 설치하고 옵션추가
```
  "main": "app.js",
  "scripts": {
    "start": "cross-env NODE_ENV=production PORT=80 pm2 start app.js -i 0",
    "dev": "nodemon app"
  }
```

## 취약점 검증
- 만약 취약점이 있으면 자동으로 어느정도 잡아주고 아니면 알려줌
```bash
npm audit
```