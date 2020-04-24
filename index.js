const cluster = require('cluster');

// console.log(cluster.isMaster); return bool if .isMaster => true

// Is the file being executed in master mode ?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but
    // in slave/child mode
    // as much cluster.fork(); we write, as much instant of the loop event will be start
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();

    // if only one cluster.fork(). there is ONLY THE MASTER INSTANCE
    // note if i run just one, it will have only one threat
    cluster.fork();
} else {
    // I am a child, i am going to act ike a server 
    // and nothing else  
    const express = require('express');
    const app = express();

    function doWork(duration) {
        const start = Date.now();
        while( Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        doWork(5000);
        res.send('Hi there');
    })

    app.get('/fast', (req, res) => {
        res.send('this was fast');
    })

    app.listen(3000);
}

// to mesurate how the server deal with the req, we use ab (apache benchmark) software 
//(nativement dispo sur mac et some linux distro)
// we run this cmd: ab -c 50 -n 500 localhost:3000/fast 
// it means that 500 req will be send at this uri and it will always have 50 at the same time
/**
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 50 -n 500 localhost:3000/fast
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /fast
Document Length:        13 bytes

Concurrency Level:      50
Time taken for tests:   0.572 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      106000 bytes
HTML transferred:       6500 bytes
Requests per second:    873.75 [#/sec] (mean)
Time per request:       57.224 [ms] (mean)
Time per request:       1.144 [ms] (mean, across all concurrent requests)
Transfer rate:          180.89 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2   5.7      0      24
Processing:    12   48  27.1     38     144
Waiting:        3   46  26.3     38     143
Total:         13   50  25.6     39     144

Percentage of the requests served within a certain time (ms)
  50%     39
  66%     45
  75%     60
  80%     82
  90%     91
  95%     99
  98%    111
  99%    120
 100%    144 (longest request)
jerome@jeromes-MacBook-Pro nodeAdvance % 
*/

// 6 threads instances
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
/*
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 6 -n 6 localhost:3000/
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        8 bytes

Concurrency Level:      6
Time taken for tests:   5.187 seconds
Complete requests:      6
Failed requests:        0
Total transferred:      1236 bytes
HTML transferred:       48 bytes
Requests per second:    1.16 [#/sec] (mean)
Time per request:       5187.204 [ms] (mean)
Time per request:       864.534 [ms] (mean, across all concurrent requests)
Transfer rate:          0.23 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:   850 2289 1381.4   2564    4265
Waiting:      849 2288 1381.5   2564    4265
Total:        850 2289 1381.4   2564    4265

Percentage of the requests served within a certain time (ms)
  50%   2564
  66%   2564
  75%   3423
  80%   3423
  90%   4265
  95%   4265
  98%   4265
  99%   4265
 100%   4265 (longest request)
*/
