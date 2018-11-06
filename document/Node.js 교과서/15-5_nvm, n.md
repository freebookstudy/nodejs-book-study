# 15-5. nvm, n
## nvm 패키지 설치 및 사용
윈도우에서는 `nvm`을 사용하고 리눅스나 mac에서는 `n`을 사용한다
1. nvm 패키지 설치
- 아래의 사이트에서 nvm-setup 다운로드 및 설치
https://github.com/coreybutler/nvm-windows/releases

2. nvm 설치된 버전 확인
```bash
nvm list
```

3. node 최신버전 설치
```bash
nvm install latest
```

4. node 특정버전 설치
```bash
nvm install 10.9 
nvm install 10
nvm install 9
```

5. node 버전 변경
```bash
nvm use 10.9.0
```

- node 버전확인
```bash
node -v
```