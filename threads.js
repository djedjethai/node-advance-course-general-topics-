// with that cmd libuv will only activate 2 threads (instead of 4)
// process.env.UV_THREADPOOL_SIZE = 2;
// with that setup, affiche (libuv traite les functions 2 par 2, as he got 2 threads)
/*
2: 1582
1: 1620
3: 2901
4: 2908
5: 4029
 */

// let set up 5 theads
process.env.UV_THREADPOOL_SIZE = 5;
// all threads function are executing in the same time,
/*
affiche
3: 2462
5: 2511
4: 2511
1: 2512
2: 2534
 */

const crypto = require('crypto');

const start = Date.now();
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('1:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('2:', Date.now() - start);
})
/* affiche
* 1: 910
* 2: 981
*/

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('3:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('4:', Date.now() - start);
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('5:', Date.now() - start);
})
/*
4: 2105
3: 2149
1: 2220
2: 2228
5: 3197
 */
