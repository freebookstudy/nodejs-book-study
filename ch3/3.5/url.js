const url = require('url');

//WHATWG 방식 - search 처리가 편리함
const URL = url.URL;
const myURL = new URL('http://www.gilbut.co.kr/book/bookView.aspx?bookcode=BN002045&page=1&sernewbook=Y&orderby=pdate&TF=T');
console.log('new URL():', myURL);
// (객체) WHATWG 방식의 url과 기존 노드의 url 모두 사용할 수 있음. 분해되었던 url 객체를 다시 원래 상태로 조립
console.log('url.format():', url.format(myURL));
console.log('--------------------------------');
// 기존 URL 방식 호스트가 없을 때도 쓸수 있음
// (주소) 주소를 분해함. WHATWG 방식과 비교하면 username과 password 대신 auth 속성이 있고, searchParams 대신 query가 있음
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookView.aspx?bookcode=BN002045&page=1&sernewbook=Y&orderby=pdate&TF=T');
console.log('url.parse():', parsedUrl);