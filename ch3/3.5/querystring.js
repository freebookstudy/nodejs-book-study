const url= require('url')
const querystring = require('querystring')
/**
 * querystring 모듈
 * 기존방식 url.parse 와 함께 많이 씀
 */
const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query); // (쿼리) url의 query 부분을 자바스크립트 객체로 분해
console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query)); // (객체) 분해된 query 객체를 문자열로 다시 조립