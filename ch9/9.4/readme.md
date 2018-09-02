## commander 를 이용한 node cli 프로그램 만들기

### node-cli 용 패키지
- commander : cli 프로그램을 작성하기 편하게 하기위한 프레임워크 yargs, meow 의 유사한 패키지들이 있음
- inquirer : 사용자와 대화형으로 소통하게 해주는 패키지
- chalk(분필) : console에 color를 더 해주는 패키지

> 설치
```bash
npm i commander inquirer chalk
```

### commander cli 옵션
-- 옵션 -단축옵션
<필수> [선택]

### inquirer
사용자와 대화형으로 소통하게 해주는 패키지
기존 `readline` 훨씬 편한 모듈들 제공

| 옵션    | 설명          |
| ------- | ------------- |
| type    | 프롬프트 종류 |
| name    | 질문명        |
| message | 메시지        |
| choices | 선택지        |
| default | 기본값        |

### chalk
테스트에 색을 부여 해준다

```javascript
console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
console.log(chalk.green(pathToFile, '생성 완료'));
console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
```