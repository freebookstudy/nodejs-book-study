## 스스로 해보기

### 파일을 복사하는 명령어 만들어보기
> 예제 코드
```javascript
const copyFile = (name, directory) => {
  if (exist(name)){
    mkdirp(directory);
    fs.copyFileSync(name, path.join(directory, name));
    console.log(`${name} 파일이 복사되었습니다.`);
  } else {
    console.error('파일이 존재하지 않아요');
  }
};

program
  .command('copy <name> <directory>')
  .usage('<name> <directory')
  .description('파일을 복사합니다.')
  .action((name, directory) => {
    console.log(name, directory);
    copyFile(name, directory);
    triggered = true;
  })

```

### 경로를 지정하면 하위 모든 폴더와 파일을 지우는 명령어 만들어보기

### 데이터베이스와 연동하여 가게부 만들어보기