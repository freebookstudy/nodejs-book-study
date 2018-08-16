const crypto = require('crypto');

var hash = crypto.createHash('sha512').update('비밀번호').digest(('base64'));
console.log(hash);

