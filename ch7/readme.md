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
#### INSERT
create 생성하기
> 레코드를 만들려면 정의한 모델의 `create()` 메소드를 사용하면 된다.
```javascript
Memo.create({
  title: 'Practice of Sequelize.js',
  body: 'Sequelize.js is ORM for Node.js.'
});
```
> 관계가 있는 모델의 교차테이블에 레코드를 만드는 것은 다음과 같이 시맨틱하게 할 수 있다.
```javascript
memo.addLabel(label);
```
> `addLabel()`은 관계를 정의하면 테이블명을 이용해서 자동적으로 만들어지는 메소드이다. 이 외에도 배열을 추가할 수 있는 `addLabels()` 메소드와 `getLabels()`, `setLabels()` 등이 자동으로 생성된다. 다대다 관계이므로 Label 모델에도 동일하게 `addMemo()`와 같은 메소드가 생성된다.

bulkCreate 여러개를 한꺼번에 처리
findOrCreate 조회 후 없으면 생성 있으면 값을 가져온다
```javascript
Memo.findOrCreate({
  where: { title: 'Mongoose.js' },
  defaults: {
    body: 'Mongoose.js is ODM for Node.js.'
  }
})
.spread((memo, created) => {
  if (created) {
    console.log('New Memo: ', memo.dataValues);
  } else {
    console.log('Old Memo: ', memo.dataValues);
  }
});
```
#### UPDATE
update 수정하기
>모델 인스턴스는 업데이트 메소드를 가지고 있다.
```javascript
Memo.update({
  title: 'Updated Memo'
}, {
  where: { id: 1 }
})
.then(() => {
  return Memo.findOne({
    where: { title: 'Updated Memo' }
  });
})
.then((memo) => {
  console.log('Updated Memo: ', memo.dataValues);
});
```

> 혹은 레코드 자체의 업데이트 메소드를 활용할 수 있다.
> 참고로, Primary Key를 업데이트하는 것은 불가능하다.
```javascript
memo.update({ body: 'This memo is updated.' })
.then((memo) => {
  console.log('Updated Memo2: ', memo.dataValues);
});
```

#### DELETE
destroy 삭제하기
```javascript
Memo.destroy({
  where: { title: 'Updated Memo' }
})
.then(() => {
  return Memo.findOne({ where: { title: 'Updated Memo' } });
})
.then((memo) => {
  console.log('Destroyed Memo? :', memo); // null
});
```
```javascript
Memo.findById(2)
.then((memo) => {
  return memo.destroy();
})
.then(() => {
  console.log('Memo is destroyed.');
});
```

#### SELECT
| 메소드 이름   | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| findAll       | 조건에 맞는 모든 row를 찾아 리턴. 만약 row가 없다면 빈 배열을 리턴 |
| findOne, find | 조건에 맞는 row중 한개만 반환 findAll에서 limit 1 적용과 똑같다.<br />primary key 조건에 의해 검색할때 즉 row가 무조건 하나만 검색되어야 하는때에 사용하면 좋다.<br />만약 row가 없다면 null을 리턴 |
| count         | 조건에 맞는 row의 갯수를 리턴                                |
| findAndCount  | 조건에 맞는 결과와 함께 row count를 함께 반환. findAll + count의 조합 |

> Sequelize.js는 레코드 조회를 위해서 `findOne()` 혹은 `findAll()`과 같은 메소드를 제공한다.
> 다만, 이렇게 얻어온 레코드의 실제 값은 dataValues라는 프로퍼티 안에 있으므로 유의해야 한다.
  또한, 조회 시 사용할 수 있는 여러가지 오퍼레이터가 존재하는데 그 목록은 여기서 확인 가능하다.
```javascript
Memo.findOne({
  where: { title: 'Practice of Sequelize.js' }
})
.then((memo) => {
  console.log('Memo: ', memo.dataValues);
});
```
> 교차테이블의 레코드를 조회하는 것도 시맨틱하게 할 수 있다.
```javascript
memo.getLabels()
.then((labels) => {
  console.log('Memo\'s Label: ', labels[0].dataValues);
});
```
> `include`라는 프로퍼티를 사용하면 조인된 상태의 데이터를 가져오는 것도 가능하다.
```javascript
Memo.findOne({
  where: { title: 'Practice of Sequelize.js' },
  include: { model: Label }
})
.then((memo) => {
  console.log('Joined Memo: ', memo.dataValues);
});
```