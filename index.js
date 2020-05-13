const keepaliveAgent = require('./lib/agent');
const http = require('http');
const fs = require('fs');
const { performance } = require('perf_hooks');

const printSocketInfo = () => {
    if (keepaliveAgent.statusChanged) {
        console.log('[%s] agent status changed', Date());
        console.log(JSON.stringify(keepaliveAgent.getCurrentStatus(), null, 2));
    }
};

const invoke = (options) => {
    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            //console.log('STATUS: ' + res.statusCode);
            //console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                resolve(chunk);
            });
        });
        req.on('error', e => {
            reject(e);
        });
        req.end();
    });
};

const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    h = String(h).padStart(2, '0');
    m = String(m).padStart(2, '0');
    s = String(s).padStart(2, '0');
    
    return `${h}:${m}:${s}`;
};

const makeCall = async () => {
    let startTime = performance.now();
    let length = 5;
    let threadCount = 500;
    for (let index = 1; index <= length; index++) {
        try {
            let threads = [];
            for(let i = 0; i < threadCount; i++){
                threads.push(invoke({
                    host: 'google.co.in',
                    port: 80,
                    path: '/',
                    method: 'GET',
                    agent: keepaliveAgent,
                }));
                // if (i/2 === 0){
                //     threads.push(invoke({
                //         host: 'google.co.in',
                //         port: 80,
                //         path: '/',
                //         method: 'GET',
                //         agent: keepaliveAgent,
                //     }));
                // } else {
                //     threads.push(invoke({
                //         host: 'mail.google.com',
                //         port: 80,
                //         path: '/',
                //         method: 'GET',
                //         agent: keepaliveAgent,
                //     }));
                // }
            }
            await Promise.all(threads);
            printSocketInfo();
            console.log(`Processing ${index} \n`);
        } catch (err) {
            console.log(`${index} Problem with request: ` + err.message);
        }
    }
    let timeTaken = (performance.now() - startTime) / 1000;
    console.log(`execution time : ${secondsToHms(timeTaken)}`);
};

fs.writeFileSync('process-id.txt', process.pid, 'utf-8');

if (process.pid) {
    console.log('This process is your pid ' + process.pid);
}
makeCall();