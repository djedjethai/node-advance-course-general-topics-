const https = require('https');

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
// affiche
/*
395
jerome@jeromes-MacBook-Pro nodeAdvance % node async.js
217
jerome@jeromes-MacBook-Pro nodeAdvance % node async.js
212
jerome@jeromes-MacBook-Pro nodeAdvance %
 */

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
/*
affiche
566
598
601
625
636
637
681
694
694
 */
