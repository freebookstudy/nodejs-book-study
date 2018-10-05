const fs = require('fs')
const zlib = require('zlib')

//pipe 는 stream 간에 연달아 쓸 수 있음
const zlibStream = zlib.createGzip();
const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme5.txt');
readStream.pipe(zlibStream).pipe(writeStream);