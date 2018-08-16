const url= require('url')
const querystring = require('querystring')
/**
 * querystring 모듈
 * 기존방식 url.parse 와 함께 많이 씀
 */
const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query));