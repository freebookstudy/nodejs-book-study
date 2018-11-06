## Node.js 데몬 실행관리 패키지 forever
1. forever 패키지 설치
```bash
sudo npm i -g forever
```

2. forever 데몬 실행하기
```bash
sudo forever start module.js
```

3. forever list 보기
```bash
sudo forever list
```

4. forever 프로세스 중지하기
```
sudo forever stop 0
```