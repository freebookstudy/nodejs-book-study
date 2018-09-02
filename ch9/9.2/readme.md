## Sync 메서드
한 번만 실행되는 경우에는 Sync 메서드를 써도 됨  
여러 번 동시에 호출 될 것 같으면 사용하면 안됨

## template.js 기능 테스트
template.js를 추가하여 template 생성 하는 cli를 구현  
package.json 의 cli에 template.js 로 변경 후 재설치
### 재설치
```bash
npm i -g
```
### html 생성
```bash
cli html main public/html
```

### router 생성
```bash
cli express-router index ./routes
```