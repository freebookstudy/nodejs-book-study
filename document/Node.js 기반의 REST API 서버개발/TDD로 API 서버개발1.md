## TDD 구현
### TDD 라이브러리
#### Mocha
- 모카(mocha)는 테스트 코드를 돌려주는 테스트 러너
- 테스트 꾸러미: 테스트 환경으로 모카에서는 `describe()`로 구현
- 테스트 케이스: 실제 테스트를 말하며 모카에서는 `it()`으로 구현
- `git checkout -f mocha`

> 모카 TDD
1. 패키지에 Mocha 설치
  ```bash
  npm i mocha --save-dev
  ```

2. `assert` node 기본 모듈을 사용한 테스트
```javascript
const assert = require('assert')

describe('GET /users', () => {
  it('배열을 반환한다', () => {
    assert.equal(1,1)
  })
})
```

#### Should
- 슈드(should)는 검증(assertion) 라이브러리다
- 
- 가독성 높은 테스트 코드를 만들 수 있다

> should TDD
1. 패키지에 Should 설치
```bash
npm i should --save-dev
```

2. 사용예시
```javascript
const should = require('should')

describe('GET /users', () => {
  it('배열을 반환한다', () => {
    (1).should.equal(1)
  })
})
```

#### SuperTest
- 단위 테스트: 함수의 기능 테스트
- 통합 테스트: API의 기능 테스트
- 슈퍼 테스트는 익스프레스 통합 테스트용 라이브러리
- 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증

> supertest TDD
1. 패키지에 supertest 
```bash
npm i supertest --save-dev
```

2. 사용예시
비동기식으로 테스트가 끝났을때 done()과 같이 콜백처리를 해줘야됨
```javascript
const request = require('supertest')
const app = require('../routes/users')

describe('GET /users', () => {
  it('배열을 반환한다', (done) => {
    request(app)
      .get('/users')
      .end((err, res) => {
        console.log(res.body);
        done()
      })
  })
})
```