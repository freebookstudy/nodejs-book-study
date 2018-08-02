const url = require('url');

//WHATWG 방식 - search 처리가 편리함
const URL = url.URL;
const myURL = new URL('http://www.gilbut.co.kr/book/bookView.aspx?bookcode=BN002045&page=1&sernewbook=Y&orderby=pdate&TF=T');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('--------------------------------');
//기존 URL 방식 호스트가 없을 때도 쓸수 있음
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookView.aspx?bookcode=BN002045&page=1&sernewbook=Y&orderby=pdate&TF=T');
console.log('url.parse():', parsedUrl);