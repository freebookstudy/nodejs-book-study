const fs = require('fs') //node 10 에서 추가 .promises;

/*
fs.access()
    .then()
    .catch()
*/

fs.access('./folder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if(err){
        if(err.code === 'ENOENT') {
            console.log('폴더 없음');
            fs.mkdir('./folder', (err) => {
                if(err){
                    throw err;
                }
                console.log('폴더 만들기 성공');
                fs.open('./folder/file.js', 'w', (err, fd) => { //w - 없으면 만들기, r - 파일을 읽음, a - 기존파일에 추가해서 씀
                    if(err){
                        throw err;
                    }
                    console.log('빈 파일 만들기 성공', fd);
                    fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
                        if(err){
                            throw err;
                        }
                        console.log('이름 바꾸기 성공');
                    })
                })
            })
        } else {
            throw err;
        }
    } else {
        console.log('이미 폴더 있음');
    }
})