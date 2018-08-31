### mongoose 프로젝트 생성
express learn-mongoose --view=pug

### MySQL 
Schema - Table - Row

### MongoDB
DB - Collection - Document

### 데이터 관리 요령
고정된 길이의 배열이면 속성 안에 넣고
계속 늘어날 것 같다면(댓글 처럼) 컬렉션을 별도로 둠

### Mongoose
Object와 Document를 맵핑해줘서 ODM 이라고 부름
몽구스는 몽고DB에 제약을 두지만 편의성과 안정성을 추가함

- Mongoose 설치
```bash
npm i mongoose
```

#### Mongoose 주요 명령어
find: 모두 찾기
findOne: 하나만 찾기
new 스키마(date).save: 생성
update: 수정하기
remove: 제거하기