const fs = require('fs')

// (경로, 콜백) 폴더 안의 내용물을 확인할 수 있음. 배열 안에 내부 파일과 폴더명이 나옴
fs.readdir('./folder', (err, dir) => {
    if(err){
        throw err;
    }
    console.log('폴더 내용 확인', dir);
    // (경로, 콜백) 파일을 지울 수 있음. 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지를 꼭 확인해야 함
    fs.unlink('./folder/newFile.js', (err) => { //파일삭제
        if(err){
            throw err;
        }
        console.log('파일 삭제 성공');
        // (경로, 콜백) 폴더를 지울 수 있음. 폴더 안에 파일이 있다면 에러가 발생하므로 먼저 내부 파일을 모두 지우고 호출해야 함
        fs.rmdir('./folder', (err) => { //폴더 삭제
            if(err){
                throw err;
            }
            console.log('폴더 삭제 성공');
        })
    })
})