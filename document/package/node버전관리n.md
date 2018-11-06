- 현재 Node 버전확인
```bash
$ node -v
```

- 강제 캐시 삭제
```bash
$ sudo npm cache clean -f
```

- n 설치
```bash
$ sudo npm i -g n
```

- n 을 이용해 NodeJs 설치
```bash
# 설치된 Node 버전 사용(목록에서 선택 후 Ctrl + c)
$ n

# 모든 Node 버전 중 설치된 버전 확인
$ n ls  

# Node 버전 설치  
$ n <version>  # ex> n 8.9.4
$ n stable  # stable 버전 설치
$ n latest  # 최신 LTS Node 버전 설치

# 제거할 Node 설정
$ n rm <version ...>  #ex> n rm 8.9.1 8.9.2
$ n prune  # 현재 버전을 제외한 모든 버전 제거
```

