const netstat = require('node-netstat');
const cTable = require('console.table');
const fs = require('fs');
const keepaliveAgent = require('./lib/agent');

let items = [];
let processId = fs.readFileSync('process-id.txt', 'utf-8');
processId = Number(processId);

netstat({
    filter: {
        pid: processId,
        protocol: 'tcp'
    },
    limit: 5,
    done : function(data){
        //console.log(data);
        console.table(items);
        console.log(JSON.stringify(keepaliveAgent.getCurrentStatus(), null, 2));
    }
}, function(data){
    if (data.remote.address){
        items.push({
            pid : data.pid,
            local : `${data.local.address}:${data.local.port}`,
            remote : `${data.remote.address}:${data.remote.port}`,
            state : data.state
        });
    }
});