const path = require('path');
path.dirname(__filename);
path.extname(__filename);
path.basename(__filename);
console.log(path.parse(__filename));
console.log(path.normalize("//Users\\\\freelife\\WebstormProjects\\lecture \path.js"));
//절대 경로 인지?
console.log(path.isAbsolute('//'));
//요청한 경로로 가는 방법을 알려줌
console.log(path.relative('/Users/freelife/WebstormProjects/lecture/path.js','/'));

console.log(__dirname);
//path.join - 절대 경로 무시하고 합침
console.log(path.join(__dirname, '..', '..', '/users', '.', '/WebstormProjects'));
//path.resolve - 절대 경로 고려하고 합침 루트는 /
console.log(path.resolve(__dirname, '..', '..','/Users','.','/freelife'));