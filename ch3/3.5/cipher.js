/**
 * 양방향 암호화
 * @type {{_toBuf, createCipher, createCipheriv, createDecipher, createDecipheriv, createDiffieHellman, createDiffieHellmanGroup, createECDH, createHash, createHmac, createSign, createVerify, getCiphers, getCurves, getDiffieHellman, getHashes, pbkdf2, pbkdf2Sync, privateDecrypt, privateEncrypt, prng, pseudoRandomBytes, publicDecrypt, publicEncrypt, randomBytes, randomFill, randomFillSync, rng, scrypt, scryptSync, setEngine, timingSafeEqual, getFips, setFips, Certificate, Cipher, Cipheriv, Decipher, Decipheriv, DiffieHellman, DiffieHellmanGroup, ECDH, Hash, Hmac, Sign, Verify}|*}
 */
const crypto = require('crypto');
// (알고리즘, 키) 암호화 알고리즘과 키를 넣어줌. 암호화 알고리즘은 aes-256-cbc를 사용함.
// 다른 알고리즘을 사용해도 됨. 사용 가능한 알고리즘 목록은 crypto.getCiphers()를 하면 볼 수 있음
const cipher = crypto.createCipher('aes-256-cbc', '열쇠');
// (문자열, 인코딩, 출력 인코딩) 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣어줌. 보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용함
let result= cipher.update('연미바보', 'utf8', 'base64');
// (출력 인코딩) 출력 결과물의 인코딩을 넣어주면 암호화가 완료됨
result += cipher.final('base64');
console.log('암호', result);

// (알고리즘, 키) 복호화할 때 사용함. 암호화할 때 사용했던 알고리즘과 키를 그대로 넣어주어야 함
const decipher = crypto.createDecipher('aes-256-cbc', '열쇠');
// (문자열, 인코딩, 출력 인코딩) 암호화된 문장. 그문장의 인코딩. 복호화할 인코딩을 넣어줌.
// createCipher의 update()에서 utf8, base64 순으로 넣었다면 createDecipher의 update() 에서는 base64, utf8 순으로 넣으면 됨
let result2 = decipher.update(result, 'base64', 'utf8');
// (출력 인코딩) 복호화 결과물의 인코딩을 넣어줌
result2 += decipher.final('utf8');
console.log('평문', result2);