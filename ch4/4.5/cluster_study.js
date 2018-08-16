const http = require('http');
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;

/**
 * cluseter 에는 master(관리자)
 * 프로세스와 worker(일꾼)
 * 프로세스가 있습니다
 * cluster.fork()가 워커를 만듭니다
 */
if(cluster.isMaster) {
  console.log('마스터 프로세스 아이디', process.pid);
  for(let i=0; i < numCPUs; i += 1){
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid, '워커가 종료되었습니다.');
    //워커가 종료되면 다시 워커를 하나 생성
    // cluster.fork();
  });
}else {
  http.createServer((req, res) => {
    res.end('http server');
    //프로세스 갯수를 실제로 확인해보기 위한 코드
    setTimeout(() => {
      process.exit(1);
    }, 1000);

  }).listen(8080);
  console.log(process.pid, '워커 실행');
}