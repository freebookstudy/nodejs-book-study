const { URL } = require('url');
/**
 * WHATWG 방식 SAMPLE
 */

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

//searchParams의 메서드는 FormData나 URLSearchParams 객체에도 비슷하게 쓰여요
console.log('searchParms:', myURL.searchParams);
console.log('searchParms.getAll():', myURL.searchParams.getAll('category')); // (키) 키에 해당하는 모든 값들을 가져옴. category 키에는 두 가지 값, 즉 nodejs와 javascript의 값이 들어 있음
console.log('searchParms.get():', myURL.searchParams.get('limit')); // (키) 키에 해당하는 첫 번째 값만 가져옴
console.log('searchParms.has():', myURL.searchParams.has('page')); // (키) 해당 키가 있는지 없는지를 검사함

console.log('searchParms.keys():', myURL.searchParams.keys()); // searchParams의 모든 키를 반복기(iterator, ES2015 문법) 객체로 가져옴
console.log('searchParms.values():', myURL.searchParams.values()); // searchParams의 모든 값을 반복기 객체로 가져옴

myURL.searchParams.append('filter', 'es3'); // (키, 값) 해당 키를 추가함. 같은 키의 값이 있다면 유지하고 하나 더 추가함
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6'); // (키, 값) append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가함
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter'); // (키) 해당 키를 제거
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString(); // 조작한 searchParams 객체를 다시 문자열로 만듬. 이 문자열을 search에 대입하면 주소 객체에 반영됨

// /hello?page=10 같이 같은 도메인은 생략하는 방식은 WHATWG 방식으로 어려움 기존 방식(url.parse)으로 해야됨