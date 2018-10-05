const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep); // 경로의 구분자. Windows는 \, POSIX는 /
console.log('path.delimiter:', path.delimiter); // 환경 변수의 구분자. process.env.PATH를 입력하면 여러개의 경로가 이 구분자로 구분. Windows는 세미콜론(;), POSIX는 콜론(:)
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string)); // (경로) 파일이 위치한 폴더 경로
console.log('path.extname():', path.extname(string)); // (경로) 파일의 확장자
console.log('path.basename():', path.basename(string)); // (경로) 파일 풀네임 확장자 까지
console.log('path.basename():', path.basename(string, path.extname(string))); // (경로, 확장자) 파일의 이름(확장자 포함). 파일의 이름만 표시하고 싶다면 basename의 두 번째 인자로 파일의 확장자를 넣어줌
console.log('------------------------------');
console.log('path.parse()', path.parse(string)); // (경로) 파일 경로를 root, dir, base, ext, name으로 분리
console.log('path.format():', path.format({ // (객체) path.parse() 한 객체를 파일 경로로 합침
  dir: 'C:\\users\\zerocho',
  name: 'path',
  ext: '.js',
}));
console.log('path.normalize():', path.normalize('C://users\\\\zerocho\\\path.js')); // (경로) /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환
console.log('------------------------------');
console.log('path.isAbsolute():', path.isAbsolute('C:\\')); // (경로) 파일의 경로가 절대경로인지 상대경로인지 true나 false로 알려줌
console.log('path.isAbsolute():', path.isAbsolute('./home'));
console.log('------------------------------');
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\')); // (기준경로, 비교경로) 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줌
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho')); // (경로, ...) 여러 인자를 넣으면 하나의 경로로 합쳐줌. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리해줌
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho')); // (경로, ...) path.join()과 비슷하지만 차이가 있습니다.


/**
 * join과 resolve의 차이
 * path.join과 path.resolve 메서드는 비슷해 보이지만 동작 방식이 다름.
 * path.resolve는 /를 만나면 절대 경로로 인식해서 앞의 경로를 무시
 * path.join은 상대경로로 처리
 */
path.join('/a', '/b', 'c'); /* 결과: /a/b/c */
path.resolve('/a', '/b', 'c') /* 결과: /b/c */

/**
 * \\ 와 / 사용
 * 콘솔 결과를 보면 어떤 때는 \\를 사용하고, 어떤 때는 그냥 \를 사용하여 Windows 경로를 표시했음
 * 기본적으로 경로는 \ 하나를 사용해서 표시 하지만 자바스크립트 문자열에서는 \가 특수문자이므로 \를 두 개 붙여 경로를 표시해야함
 * 예를 들어 \n은 자바스크립트 문자열에서 줄바꿈이라는 뜻
 * 따라서 C:\node와 같은 경로에서 의도하지 않은 오류가 발생할 수 있으므로 C:\\node 처럼 표시
 * path 모듈은 위와같은 경우에 발생하는 문제를 알아서 처리해줌
 * Windows에서 path 모듈이 꼭 필요한 이유이기도 함
 */

/**
 * 상대경로와 절대경로
 * 절대경로는 루트 폴더(Windows의 C:\나 POSIX의 /)나 노드 프로세스가 실행되는 위치가 기준이 됨
 * 상대경로는 현재 파일이 기준이 됨. 현재 파일과 같은 경로면 점 하나(.)를, 현재 파일보다 한 단계 상위 경로면 점 두개(..)를 사용해 표현
 * C:\users\zerocho\path.js 에서 C:\로 가고 싶다면 절대경로에서는 그냥 C:\를 입력하면 됨
 * 하지만 상대 경로에서는 ..\..를 해야 두 디렉터리 위로 올라가 C:\가 됨
 */
//Windows
//path.posix.sep, path.posix.join()

//POSIX
//path.win32.sep, path.win32.join()

