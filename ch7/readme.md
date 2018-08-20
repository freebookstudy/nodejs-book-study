## Node.js MySQL 연동
### sequelize 프로젝트 생성
```bash
express learn-sequelize --views=pug
```

### sequelize, mysql2 설치
```bash
npm i sequelize mysql2
```

### sequelize cli(Command Line Interface) 설치
```bash
npm i -g sequelize-cli
```

### sequelize 사용

```bash
sequelize init
```
#### sequelize init 시 생성되는 항목
- config/config.json
- models
- migrations
- seeders

### sequelize MySQL models 설정 옵션
#### type: 자료형
allowNull: NULL 허용여부 NOT NULL 이면 false
defaultValue: 기본값
unique: 고유값 여부
comment: 컬럼 설명
primaryKey: 기본키 여부(id 대체)

자료형: STRING(글자수), INTEGER, FLOAT, TEXT, DATE, BOOLEAN 등등

timestamp: timestamps 사용여부
underscored: underscored 사용여부

### sequelize query
include: 모델 간의 관계 연결
model: 어떤 모델인지 지정
where: 쿼리 조건 설정

### Promise 지원 메서드
create 생성하기
findAll 모두 찾기
find 하나만 찾기