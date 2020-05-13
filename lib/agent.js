const Agent = require('agentkeepalive');

module.exports = new Agent({
    maxSockets: 512,
    maxFreeSockets: 512,
    timeout: 10000 * 2, // active socket keepalive for 60 seconds
    freeSocketTimeout: 10000 // free socket keepalive for 30 seconds
});

// freeSocketTimeout  = 30000
// 1) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 10 => 2500, created:2460, closed:2376, freeSockets : 10, used : 74 => 26 secs
// 2) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 256 => 2500, created:1476, closed:1205, freeSockets : 256, used : 15 => 12 secs
// 3) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 512 => 2500, created:500, closed:0, freeSockets : 500, used : 0 => 6 secs

// freeSocketTimeout = 10 s, timeout = 20 s
// 1) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 10 => 2500, created:2460, closed:2449, freeSockets : 10, used : 1 => 25 secs
// 2) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 256 => 2500, created:1476, closed:1219, freeSockets : 256, used : 1 => 17 secs
// 3) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 512 => 2500, created:500, closed:0, freeSockets : 500, used : 0 => 7 secs
// 4) iteration 5, thread 500, maxSockets : 500, maxFreeSockets : 512 => 2500, created:500, closed:0, freeSockets : 500, used : 0 => 7 secs