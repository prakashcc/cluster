#! /usr/bin/env node
const program = require('commander');
const cluster = require('cluster');
const os = require('os');
const fs = require('fs');
//const app = require(filePath); 

program
      .version("1.0.0")
      .option('-b, --start [file]')
      .option('-s, --stop [process]','Stop process')
      .option('-r,--restart [process]','Restart process')
      .option('-p,--port [number]','Port number')
      .option('-c,--process [number]','No of process')

// program
//       .command('start <filepath> <port> <process>')
//       .description('this is to start the process')
//       .action(function(filepath,port,process,option){
//           console.log(`${program.filepath}`)
//           console.log("Hi process started now")
//       });



program.parse(process.argv);  

global.filePath;
if (program.start === undefined) {
    console.log(
    ".option('-b, --start [file]','Start processs') \n"+
    ".option('-s, --stop [process]','Stop process') \n"+
    ".option('-r,--restart [process]','Restart process') \n"+
    ".option('-p,--port [number]','Port on Process') \n"
    );
} 
else if(program.start === true) {
    console.log("Please Provide file to start"); 
}
else{
   filePath = __dirname + '\\' + `${program.process}`;
   console.log(__dirname);
                 
    if(cluster.isMaster){
        const cpus = os.cpus().length;

      console.log('Forking for ${cpus} CPUs');
      for (let i = 0; i<cpus;i++){
          cluster.fork();
      }
    }
    else{
        require(filePath);
    }

    console.log("filepath = ");
    }

    



global.portNumber; 
if (program.port === undefined) {
     console.log("No Port Defines");
} 
else if(program.port === true) {
    console.log("Please Provide Port to start"); 
}
else{
    portNumber =  `${program.port}`;
    console.log(typeof(portNumber));
    console.log("Port Number = "+ portNumber);
}

global.numberofProcess; 
if (program.process === undefined) {
    console.log("No.of Process Not Defined");
} else if(program.process === true) {
    console.log("Please provide no of process start"); 
}
else{
    numberofProcess =  `${program.process}`;
    console.log("Process Number = "+ numberofProcess);
}