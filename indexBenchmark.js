// we set the Threadpool to one. to see clearly the benchmark result for each instance
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
const crypto = require('crypto');

// console.log(cluster.isMaster); return bool if .isMaster => true

// Is the file being executed in master mode ?
if (cluster.isMaster) {
    
    cluster.fork();
    cluster.fork();

} else {
   
    const express = require('express');
    const app = express();
   
    
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        })    
    })

    app.get('/fast', (req, res) => {
        res.send('this was fast');
    })

    app.listen(3000);
}

// coded like it, there is ONLY THE MASTER INSTANCE
// cluster.fork();
/*
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 1 -n 1 localhost:3000/
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        8 bytes

Concurrency Level:      1
Time taken for tests:   1.003 seconds
Complete requests:      1
Failed requests:        0
Total transferred:      206 bytes
HTML transferred:       8 bytes
Requests per second:    1.00 [#/sec] (mean)
Time per request:       1003.006 [ms] (mean)
Time per request:       1003.006 [ms] (mean, across all concurrent requests)
Transfer rate:          0.20 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:  1003 1003   0.0   1003    1003
Waiting:     1001 1001   0.0   1001    1001
Total:       1003 1003   0.0   1003    1003
*/


// here we got 2 instances
// cluster.fork()
// cluster.fork()
// that's great as the os run the 2 instances at the same time he run 1 single instance
/*
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 2 -n 2 localhost:3000/
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /
Document Length:        8 bytes

Concurrency Level:      2
Time taken for tests:   1.820 seconds
Complete requests:      2
Failed requests:        0
Total transferred:      412 bytes
HTML transferred:       16 bytes
Requests per second:    1.10 [#/sec] (mean)
Time per request:       1820.081 [ms] (mean)
Time per request:       910.041 [ms] (mean, across all concurrent requests)
Transfer rate:          0.22 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:   904  910   9.0    916     916
Waiting:      903  910   8.8    916     916
Total:        904  910   8.9    916     916

Percentage of the requests served within a certain time (ms)
  50%    916
  66%    916
  75%    916
  80%    916
  90%    916
  95%    916
  98%    916
  99%    916
 100%    916 (longest request)
*/

// here we got 6 instances
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
// cluster.fork()
// we can notice that the execution time is not faster anymore (2416ms instead of 1000ms)
// that s bc the os have to run the 6 tasks at the same time, so he jump from threads to threads 
// trying to run all of them at the same time.
// conslusion. there is too much instances in our cluster in this case
/*
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 6 -n 6 localhost:3000/

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.4      1       1
Processing:  1349 2229 431.1   2408    2418
Waiting:     1346 2227 431.9   2407    2416
Total:       1350 2230 431.3   2408    2419

Percentage of the requests served within a certain time (ms)
  50%   2408
  66%   2408
  75%   2416
  80%   2416
  90%   2419
  95%   2419
  98%   2419
  99%   2419
 100%   2419 (longest request)
*/

// here we got 2 instances in the cluster
// cluster.fork()
// cluster.fork()
// but we run 6 req at the same time
// it s longuer than with 6 instances. so 6 instances is still better 
// strange as with the prof it s faster
/*
jerome@jeromes-MacBook-Pro nodeAdvance % ab -c 6 -n 6 localhost:3000/

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:   873 1517 760.1   1818    2766
Waiting:      869 1516 761.1   1818    2766
Total:        873 1517 760.1   1818    2766

Percentage of the requests served within a certain time (ms)
  50%   1818
  66%   1818
  75%   1819
  80%   1819
  90%   2766
  95%   2766
  98%   2766
  99%   2766
 100%   2766 (longest request)
*/

// with 10 instances
// ab -c 10 -n 10 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2   0.9      1       3
Processing:   852 3890 1067.7   4237    4264
Waiting:      849 3889 1068.2   4237    4261
Total:        853 3891 1068.1   4239    4265
WARNING: The median and mean for the initial connection time are not within a normal deviation
        These results are probably not that reliable.

Percentage of the requests served within a certain time (ms)
  50%   4239
  66%   4245
  75%   4250
  80%   4253
  90%   4265
  95%   4265
  98%   4265
  99%   4265
 100%   4265 (longest request)
*/

// with 2 instances
// ab -c 10 -n 10 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.2      0       1
Processing:   881 2336 1286.2   2714    4463
Waiting:      881 2335 1286.7   2714    4463
Total:        881 2336 1286.1   2714    4463

Percentage of the requests served within a certain time (ms)
  50%   2714
  66%   2726
  75%   3595
  80%   3609
  90%   4463
  95%   4463
  98%   4463
  99%   4463
 100%   4463 (longest request)
*/

// 20 instances
// ab -c 20 -n 20 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        1   25   8.6     28      34
Processing:   927 8027 1676.8   8430    8524
Waiting:      906 8025 1681.3   8430    8523
Total:        928 8052 1682.5   8457    8558

Percentage of the requests served within a certain time (ms)
  50%   8457
  66%   8525
  75%   8534
  80%   8538
  90%   8545
  95%   8558
  98%   8558
  99%   8558
 100%   8558 (longest request)
*/

// 2 instances
// ab -c 20 -n 20 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    4   2.8      5       8
Processing:   903 5176 2901.2   5136   10451
Waiting:      894 5175 2902.0   5136   10450
Total:        904 5180 2899.2   5141   10451

Percentage of the requests served within a certain time (ms)
  50%   5141
  66%   6953
  75%   7852
  80%   7882
  90%   9586
  95%  10451
  98%  10451
  99%  10451
 100%  10451 (longest request)
jerome@jeromes-MacBook-Pro nodeAdvance % 
*/

// 50 instances
// ab -c 50 -n 50 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        1   25   7.4     25      40
Processing:   946 23362 3243.6  23862   24138
Waiting:      913 23359 3247.8  23862   24138
Total:        947 23388 3247.0  23892   24157

Percentage of the requests served within a certain time (ms)
  50%  23892
  66%  23982
  75%  24060
  80%  24090
  90%  24127
  95%  24149
  98%  24157
  99%  24157
 100%  24157 (longest request)
*/

// 2 instances
// ab -c 50 -n 50 localhost:3000/
/*
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        1    8   3.9      8      15
Processing:   947 13523 7905.3  14172   27940
Waiting:      933 13523 7905.8  14171   27940
Total:        948 13530 7901.9  14179   27943

Percentage of the requests served within a certain time (ms)
  50%  14179
  66%  18543
  75%  20523
  80%  21458
  90%  24239
  95%  26044
  98%  27943
  99%  27943
 100%  27943 (longest request)
 */