const cluster = require('cluster');
const os = require('os');
const app = require(filePath); 








cluster(app)
  .use(cluster.logger('logs'))
  .use(cluster.stats())
  .use(cluster.pidfiles('pids'))
  .use(cluster.cli())
  .use(cluster.repl(8888))
  .listen(portNumber);



  
async function systemusage(){

    console.log("Platform: " + osutils.platform());
    console.log("Number of CPUs: " + osutils.cpuCount());
    
    osutils.cpuUsage(function(v) {
      console.log("CPU Usage (%) : " + v);
    });
    
    console.log("Load Average (5m): " + osutils.loadavg(5));
    
    console.log("Total Memory: " + osutils.totalmem() + "MB");
    
    console.log("Free Memory: " + osutils.freemem() + "MB");
    
    console.log("Free Memory (%): " + osutils.freememPercentage());
    
    console.log("System Uptime: " + osutils.sysUptime() + "ms");
  
  }
  
  async function processusage(){
  
    const startUsage = process.cpuUsage();
    // { user: 38579, system: 6986 }
    
    // spin the CPU for 500 milliseconds
    const now = Date.now();
    while (Date.now() - now < 500);
    
    console.log(process.cpuUsage(startUsage));
    // { user: 514883, system: 11226 }
    console.log(process.memoryUsage());
  }
  
  async function stopprocess(){
    process.exit;
  }
  
  async function startprocess(){
   
    if (cluster.isMaster) {
      masterProcess();
    } else {
      childProcess();  
    }
   
  }

  function masterProcess() {
    var numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);
  
    for (let i = 0; i < numCPUs; i++) {
      console.log(`Forking process number ${i}...`);
      cluster.fork();
    }
  }
  
  function childProcess() {
    var numCPUs = os.cpus().length;
    console.log(`Worker ${process.pid} started...`);
  
    http.createServer((req, res) => {
      res.writeHead(200);
      res.end('Hello World');
    }).listen(3000);
  }


// if(cluster.isMaster){
//     const cpus = os.cpus().length;
//     for(let i =0; i<cpus; i++){
//         cluster.fork();
//     }
    
//     cluster.on('exit',(worker,code,signal) => {
//         if(code !==0 && !worker.exitedAfterDisconnect){
//             console.log(`Worker ${worker.id} crashed` + 
//             'Starting a new worker....'
//             );
//             cluster.fork();
//         }
//     });
// } else{
//      require(filePath);
// }

