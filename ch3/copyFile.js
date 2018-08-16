const fs = require('fs')

const readStream = fs.copyFile('./readme4.txt', './writeme4.txt', (err) => {
    console.log(err);
})