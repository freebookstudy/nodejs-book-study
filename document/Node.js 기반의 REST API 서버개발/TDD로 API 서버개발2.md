## 첫 API 테스트 만들기
1. 성공
    - 유저 객체를 담은 배열로 응답한다
    - 최대 limit 갯수만큼 응답한다
2. 실패
    - limit이 숫자형이 아니면 400을 응답한다
    - offset이 숫자형이 아니면 400을 응답한다

## 전달형식
1. querystring 형식
```javascript
/users/?limit=10 
```

2. body 형식
- 대량의 데이터 전달할 때 JSON객체 형식으로 전달
- POST 메서드에서 많이 사용
```javascirpt
/users/ {limit: 19}
```

## 테스트 코드 작성 방법
> 성공과 실패처리를 각각 처리하기 위해 `discribe`함수를 중첩해서 성공과 실패로 분리하여 사용
> 어떤 것들을 테스트하고 있는지 이 API의 스펙이 무엇인지 쉽게 알게 하기 위해
```javascript
describe('GET /users', () => {
  describe('성공', () => {
    it('배열을 반환한다', (done) => {
      
    })
    it('최대 limit 갯수만큼 응답한다', done => {
     
    })
  })

  describe('실패', () => {
      it('limit이 정수가 아니면 400을 응답한다', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})
```
> 400 에러를 캐치하기 위해 400에러를 리턴하는 코드를 추가한다
```javascript
router.get('/', (req, res) => {
  console.log(req.query.limit);
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if(!Number.isNaN(limit)){
    res.json(users.slice(0, limit))
  } else {
    res.status(400).end()
  }
})
```