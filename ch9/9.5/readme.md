## 스스로 해보기

### 파일을 복사하는 명령어 만들어보기
#### 사용된 fs 함수
- 파일 접근 여부 확인 후 읽기
```javascript
fs.accessSync()
```
- 디렉토리 생성
```javascript
fs.mkdirSync()
```
- 파일 복사
```javascript
fs.copyFileSync()
```
#### 사용된 path 함수
- FROM 디렉토리로 부터 TO까지의 상대경로를 반환함(동일한 경로일 경우 path.resolve()를 호출한 후 길이가 0인 문자열을 반환)
```javascript
path.relative()
```
- 경로 순서대로 리턴함 path 가 정해지지 않으면 절대경로를 적용함
```javascript
path.resolve()
```
- 어느정도 잘못된 경로를 보정해줌
```javascript
path.normalize()
```
-플랫폼 별 경로 세그먼트 구분 기호를 제공합니다.
```javascript
path.sep
```
- 플랫폼 별 구분 기호를 구분 기호로 사용하여 지정된 모든 세그먼트를 함께 조인한 경로를 반환
```javascript
path.join()
```
> 예제 코드
```javascript
const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const mkdirp = (dir) => {
  const dirname = path.relative('.', path.normalize(dir)).split(path.sep).filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if(!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
  
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

## 파일 지우기 만들기
중첩되거나 하는 문제에는 재귀함수를 쓰면 좋음
- 디렉토리정보 가져오기
```javascript
fs.readdirSync(path)
```
- 파일 삭제
```javascript
fs.unlinkSync(path)
```
- 폴더 삭제
```javascript
fs.rmdirSync(path)
```


### 경로를 지정하면 하위 모든 폴더와 파일을 지우는 명령어 만들어보기
```javascript
//경로를 지정하면 하위 모든 폴더와 파일을 지움
const rimraf = (p) => {
  if (exist(p)) {
    try{
      const dir = fs.readdirSync(p);
      console.log(dir);
      dir.forEach((d) => {
        rimraf(path.join(p, d));
      });
      fs.rmdirSync(p);
      console.log(`${p} 폴더를 삭제했습니다.`);
    }catch (e) {
      fs.unlinkSync(p)
      console.log(`${p} 파일을 삭제했습니다.`);
    }
  } else {
    console.error('파일 또는 폴더가 존재하지 않아요');
  }
}

program
  .command('rimraf <path>')
  .usage('<path>')
  .description('지정한 경로와 그 아래 파일/폴더를 지웁니다.')
  .action((path) => {
    rimraf(path);
    triggered = true;
  })
```

### 경로를 지정하면 하위 모든 폴더와 파일을 지우는 명령어 만들어보기

### 데이터베이스와 연동하여 가게부 만들어보기