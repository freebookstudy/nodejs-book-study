## Node CLI
> CLI 프로그램은 터미널에서 실행하는 프로그램 입니다

## node 주석은 리눅스나 맥에서 유효합니다
```bash
#!노드설치경로
``` 

## cli package.json 구성

`package.json`의 `bin`에 `cli`라는 구성요소를 작성하고 
```json
{
  "name": "node-cli",
  "version": "0.0.1",
  "dependencies": "nodejs cli program",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "freelife",
  "license": "ISC",
  "bin": {
    "cli": "./index.js"
  }
}
```

아래와 같이 입력하면 현재 패키지를 전역으로 설치 함  
패키지 명을 써주면 해당 패키지명으로 전역 설치가됨  
전역 설치가 되는 순간 `cli` 프로그램이 됨  
패키지 네임과 명령어가 꼭 같을 필요는 없음
```bash
npm i -g
```
그후 `cli` 명령어를 치면 전역 설치된 `node-cli`를 실행함

`process.argv`는 사용자가 입력한 내용을 배열로 출력함
`process.argv[0]`: 노드 설치 경로
`process.argv[1]`: 파일 위치 경로

사용자가 입력한 값을 가져와 동작을 달리 할 수 있음  