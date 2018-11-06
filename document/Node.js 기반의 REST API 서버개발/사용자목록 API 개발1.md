
##  GET /users/:id
사용자 한명에 대한 조회 API
1. success
    - id가 1인 유저 객체를 반환
2. error
    - id가 숫자가 아닐경우 400으로 응답
    - id로 유저를 찾을 수 없을 경우 404로 응답

/:id 형식으로 요청이 들어올경우
id 값이 req.params.id 로 자동으로 맵핑된다

## DELETE /users/:id
사용자 삭제
1. success
    - 204를 응답한다
2. error
    - id가 숫자가 아닐경우 400으로 응답한다

## POST /users
사용자 등록
1. success
    - 201 상태코드를 반환한다
    - 생성된 유저 객체를 반환한다
    - 입력한 name을 반환한다
2. error
    - name 파라메터 누락시 400을 반환한다
    - name이 중복일 경우 409를 반환한다

### POST 형식 처리
`body-parser` 모듈 사용
POST형식 데이터를 `req.body`로 받음

## curl 명령어
### POST 전송
```bash
curl -d '{"name":"Daniel"}' -H "Content-Type: application/json" -X POST http://localhost:3000/users
```

curl -d '{"email":"test@test.com","password":"test"}' -H "Content-Type: application/json" -X POST http://localhost:3000/auth/login

## 리팩토링
> 역할에 따라 파일로 분리하자
- api/user/index.js
- api/user/user.ctrl.js
- api/user/user.spec.js