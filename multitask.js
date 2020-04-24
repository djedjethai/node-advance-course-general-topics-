const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

process.env.UV_THREADPOOL_SIZE = 1;

const start = Date.now();

function doRequest(){
  https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    })
  })
  .end();
}

doRequest();

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    })
}

fs.readFile('multitask.js', 'utf-8', () => {
    console.log('FS:', Date.now() - start );
})

doHash();
doHash();
doHash();
doHash();
/** affiche
 * kind of strange result;
 * 1/ the https req depend of the os, so is doing his life, and finish 1st
 * 2/ thread 1, take care fs. thread 2,3,4 take care doHash(). left 1 doHash() to take care
 * 3/ fs function is async so as soon the req is send to the hard-drive, the thread take-care the last doHash()
 * 4/ whe the first doHash() thread is done, the available thread finish the fs()
 * 5/ fs() is super fast so comes out first then the 3 last doHash() are following
326
Hash: 1831
FS: 1873
Hash: 1945
Hash: 2007
Hash: 2037
 */

/** if we take off the 4 doHash
FS: 28
208
 */ 

/**
  * if we were setting the threadpool with 5 threads (process.env.UV_THREADPOOL_SIZE = 5;)
  * makes sense.....
FS: 50
232
Hash: 1800
Hash: 1839
Hash: 1872
Hash: 1873
  */

/**
  * if we were setting the threadpool with only 1 thread (process.env.UV_THREADPOOL_SIZE = 1;)
  * makes sense.....
205
Hash: 900
Hash: 1761
Hash: 2630
Hash: 3496
FS: 3497
  */