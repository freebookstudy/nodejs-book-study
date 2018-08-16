## npm
engine은 이 패키지가 사용할 node 와 npm 버전을 적는 곳
버전은 semVer 버전 형식
major.minor.patch patch는 버그수정, minor는 신기능 추가, major는 대규모 변화(고장 확률)

### npm 명령어 보기
- npm outdated - 업그레이드 버전보기
- npm remove 모듈명 - 모듈제거
- npm search 모듈 - 모듈검색
- npm info 모듈 - 모듈정보 자세히 보기
- npm ls 모듈 - 지금 내패키지에서 모듈이 어떤 디펜던시에 설치된지 볼수 있음
딸려온 모듈들을 볼수 있음
- npm adduser - npm 유저가입정보 입력
- npm whoami - 현재 로그인된 유저정보 확인
- npm logout - 현재 유저 로그아웃
- npm version 버전 - 버전 올리기
- npm version path - 패치버전 올리기
- npm version minor - 마이너버전 올리기(패치버전 초기화)
- npm version major - 메이저버전 올리기(마이너버전 초기)
- npm publish - npm 패키지 배포하기
- npm unpublish 패키지명 --force - 24시간안에 배포한 패키지를 삭제할 수 있음
- npm ls -g --depth=0  -  npm 설치된 전역모듈 확인
- npm ls - 설치된 모듈 확인
- npm list