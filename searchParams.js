const { URL } = require('url');
/**
 * WHATWG 방식 SAMPLE
 */

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

//searchParams의 메서드는 FormData나 URLSearchParams 객체에도 비슷하게 쓰여요
console.log('searchParms:', myURL.searchParams);
console.log('searchParms.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParms.get():', myURL.searchParams.get('limit'));
console.log('searchParms.has():', myURL.searchParams.has('page'));

console.log('searchParms.keys():', myURL.searchParams.keys());
console.log('searchParms.values():', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();

// /hello?page=10 같이 같은 도메인은 생략하는 방식은 WHATWG 방식으로 어려움 기존 방식(url.parse)으로 해야됨