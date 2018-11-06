http://expressjs.com/ko/starter/generator.html

$ npm install express-generator -g

express -c sass --session -e --git ProjectName

$ express -h

   사용법 : express [옵션] [dir]

   옵션 :

     -h, --help 출력 사용법 정보
         --version 버전 번호를 출력합니다.
     -e, - ejs 엔진 지원을 추가합니다.
         --hbs는 핸들 바 엔진 지원을 추가합니다.
         - pug 추가 pug 엔진 지원
     -H, --hogan hogan.js 엔진 지원 추가
     -v, --view <engine>보기 추가 <engine> 지원 (ejs | hbs | hjs | jade | pug | twig | vash) (기본값은 jade)
     -c, --css <engine> 스타일 시트 추가 <engine> 지원 (less | stylus | compass | sass) (기본값은 plain css)
         --git add .gitignore
     -f, - 비어 있지 않은 디렉토리에 대한 강제 실행

$ cd myapp
$ npm install

$ DEBUG=myapp:* npm start

