## 클라우드 배포
- VM인스턴스 GCP 미국 초소형 744 시간 무료

Ubuntu 16.04 LTS 선택
HTTP 트래픽 허용
HTTPS 트래픽 허용

### AWS LightSail 이라면
아파치를 꺼야지 Node 가 기동 되는데 
bitnami는 apache 가 기본으로 구동되고 있어서 꺼야됨
```bash
cd /opt/bitnami
sudo ./ctlscript.sh stop apache
```

### 순서대로 Node.js 운영 구성
1. git clone
```bash
git clone git주소
```

2. apt-get update
```bash
sudo apt-get update
```

3. build-essential 설치
```bash
sudo apt-get install -y build-essential
```

4. curl 설치
``` bash
sudo apt-get install curl
```

5. Node 레파지토리 연결
```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash --
```

6. nodejs 설치
```bash
sudo apt-get install -y nodejs
sudo npm i -g npm
```

7. apt-get update
```bash
sudo apt-get update
```

8. MySQL 설치
```bash
sudo apt-get install -y mysql-server
```
    1. 비밀번호 입력
    2. mysql 설정
     ```bash
    mysql_secure_installation
    ```
    3. mysql 설치 확인
    ```bash
    mysql -h localhost -u root -p
    ```

9. git으로 내려받은 소스 npm 패키지 설치
```bash
npm i
```

10. pm2, cross-env, sequelize-cli 설치
```bash
sudo npm i -g pm2 cross-env sequelize-cli
```

11. .env 파일 수동생성
```bash
vim .env
```

12. sequelize로 DB 생성
```bash
sequelize db:create --env production
```

13. 모듈 시작
```bash
npm start
```