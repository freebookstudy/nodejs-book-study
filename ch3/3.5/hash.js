/**
 * 단방항 암호화
 * @type {{_toBuf, createCipher, createCipheriv, createDecipher, createDecipheriv, createDiffieHellman, createDiffieHellmanGroup, createECDH, createHash, createHmac, createSign, createVerify, getCiphers, getCurves, getDiffieHellman, getHashes, pbkdf2, pbkdf2Sync, privateDecrypt, privateEncrypt, prng, pseudoRandomBytes, publicDecrypt, publicEncrypt, randomBytes, randomFill, randomFillSync, rng, scrypt, scryptSync, setEngine, timingSafeEqual, getFips, setFips, Certificate, Cipher, Cipheriv, Decipher, Decipheriv, DiffieHellman, DiffieHellmanGroup, ECDH, Hash, Hmac, Sign, Verify}|*}
 */
const crypto = require('crypto');

// createHash(알고리즘): 사용할 해시 알고리즘을 넣어줌. md5, sha1, sha256, sha512등이 가능하지만, md5와 sha1은 이미 취약점이 발견됨
// 현재는 sha512 정도로 충분하지만 나중에 sha512마저도 취약해지면 더 강화된 알고리즘으로 바꿔야됨
// update(문자열): 변환할 문자열을 넣어줌
// digest(인코딩): 인코딩할 알고리즘을 넣어줌. base64, hex, latin1이 주로 사용되는데, 그중 base64가 결과 문자열이 가장 짧아 애용됨. 결과물로 변환된 문자열을 반환

var hash = crypto.createHash('sha512').update('비밀번호').digest(('base64'));
console.log(hash);

