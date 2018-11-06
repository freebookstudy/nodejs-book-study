# 10-12. multer로 이미지 업로드하기.md
## 1. 사진업로드 구현을 위해 multer 설치
`multipart/form-data` 형식에 대해서는 아래 모듈이 해석하지 못함
```javascript
app.use(express.json());
app.use(express.urlencoded({extend: false}));
```

이미지를 업로드하려면 `form`을 `multipart/form-data`로, 그리고 이 것을 해석하려면 `multer`가 필요
1. `multer` 설치
```bash
npm i multer
```

## 2. post.js router에 multer 설정

* multer 설정 옵션
  - storage: 어디에 저장할지(로컬 스토리지나 외부 스토리지(클라우드등)에 저장할 수 있음)
  - limit: 파일 사이즈(바이트 단위)
  - destination: 파일 경로
  - filename: 파일명
  - cb(에러, 결과값)

중복 방지를 위해 파일 명은 현재시간을 추가함
```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) { //파일 저장 경로 설정
      cb(null, 'uploads/'); //파일 저장 경로는 uploads/
    },
    filename(req, file, cb) { //파일 명 설정
      const ext = path.extname(file.originalname); //확장자 가져오기
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext); //확장자를 제외한 파일명 + 현재시간 + 확장자
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
```

## 3. multer 이미지 등록 처리
* multer 사용옵션
  - single: 이미지 하나(필드명)
  - array: 이미지 여러 개(단일 필드)
  - fields: 이미지 여러 개(여러 필드)
  - none: 이미지 X

`upload.single('img')`라고 받도록 설정하고 Input filename img로 전송하면
multer가 알아서 파일을 읽어서 설정사항대로 저장을 하고 다음 미들웨어를 실행함
이미지 업로드한 파일은 `req.file`에 저장됨
```javascript
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  res.json({ url: `/img/${req.file.filename}` }); //프론트로 파일 저장정보를 리턴해줌
});
```

## 4. app.js 에 이미지 정적 파일 영역 설정 추가
express.static 미들웨어로 실제주소(/uploads)와 접근주소(/img)를 다르게 만들 수 있음
```javascript
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // /img/abc.png 로 접근
```