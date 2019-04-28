const inquirer = require('inquirer');
const os = require("os");
const arg = require('arg');
const cluster = require('cluster');
const http = require('http');
var osutils = require('os-utils');
const process = require('process');


   
export async function cli(args) {
  
  try {
  
  if (args.length < 5) {
    let options = parseArgumentsIntoOptions(args);
      options = await promptForProcessOptions(options);
     // console.log(options);
   // console.log("true");
  } else {
      console.log("Only two parameter are allowed");
      process.abort; 
      console.log("Process abort")    
  }  

  } 
  catch (error) {
    console.log(error);
  } 
   
   }

   function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
      {
        '--start': Boolean,
        '--stop': Boolean,
        '--restart': Boolean,
        '--info': Boolean,
        '--sysinfo':Boolean,
        '--proinfo':Boolean,
        '--port':Boolean,
        '--nodes': Boolean,
        '-start': '--start',
        '-stop': '--stop',
        '-restart': '--restart',
        '-sysinfo':'--sysinfo',
        '-proinfo':'--proinfo',
        '-node':'--nodes',
        '-processport' : '--port'
      }        
    ); 
    return {
      startprocess: args['--start'] || false,
      stopprocess: args['--stop'] || false,
      restartprocess: args['--restart'] || false,
      sysinfo: args['--sysinfo'] || false,
      proinfo: args['--proinfo'] || false,
      node:args['--nodes'] || false ,
      processport:args['--port'] || false

    };
   }


async function promptForProcessOptions(options) {
  if(options.startprocess){

    startprocess(); 
    console.log(process.arg[2])
    console.log(process.platform);
  }
  if(options.stopprocess){
    stopprocess();
  }
  if(options.restartprocess){
    process.exit;
    if (cluster.isMaster) {
      masterProcess();
    } else {
      childProcess();  
    }
    console.log(process.versions);
  }
  
  if(options.proinfo){
    processusage();
  }

  if(options.sysinfo){
    systemusage();
 }

  if(options.node){
   // console.log(process.)
  }
}


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

//
// 
//
// clipm.log = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)()
//   ]
// });

// clipm.log.cli();

//
// 
//
// clipm.out = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)()
//   ]
// });

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

