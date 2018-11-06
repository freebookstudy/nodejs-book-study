## HTTP 상태코드
- 1XX: 아직 처리중
- 2XX: 자, 여기있어!
- 3XX: 잘 가!
- 4XX: 니가 문제임
- 5XX: 내가 문제임

| 상태코드 | 내용                            |
| -------- | ------------------------------- |
| 200      | 성공(success), GET, PUT         |
| 201      | 작성됨(created), POST           |
| 204      | 내용 없음(No Content), DELETE   |
| 400      | 잘못된 요청(Bad Request)        |
| 401      | 권한 없음(Unauthorized)         |
| 404      | 찾을 수 없음(Not found)         |
| 409      | 충돌(Conflict)                  |
| 500      | 서버 에러(Interel server error) |