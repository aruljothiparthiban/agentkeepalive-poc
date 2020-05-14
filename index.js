const keepaliveAgent = require('./lib/agent');
const fs = require('fs');
const { getUsers } = require('./services/users');
import ExecutionTime from './lib/execution-time';

const printSocketInfo = () => {
    if (keepaliveAgent.statusChanged) {
        console.log('[%s] agent status changed', Date());
        console.log(JSON.stringify(keepaliveAgent.getCurrentStatus(), null, 2));
    }
};

const start = async () => {
    let execution = new ExecutionTime('Keet Alive');
    let length = 5;
    let threadCount = 1;
    for (let index = 1; index <= length; index++) {
        try {
            let threads = [];
            for(let i = 0; i < threadCount; i++){
                threads.push(getUsers());
            }
            await Promise.all(threads);
            printSocketInfo();
            console.log(`Processing ${index} \n`);
        } catch (err) {
            console.log(`${index} Problem with request: ` + err.message);
        }
    }
    execution.end();
};

fs.writeFileSync('process-id.txt', process.pid, 'utf-8');

if (process.pid) {
    console.log('This process is your pid ' + process.pid);
}

start();