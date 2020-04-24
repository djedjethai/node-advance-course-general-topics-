const express = require('express');
const app = express();
const crypto = require('crypto'); 
    
app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        res.send('Hi there');
    })    
})

app.get('/fast', (req, res) => {
    res.send('this was fast');
})

app.listen(3000);

// this cmd run the project under pm2 instances's cluster management
// means as much instances as pm2 calculate as needed. 
// pm2 will calculate the number of logic core on the machine, and will start the same number of instances.
// start indexPm2.js -i 0 
/*
    Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------
// 4 logical cores on my machine
┌─────┬─────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name        │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ indexPm2    │ default     │ 1.0.0   │ cluster │ 1194     │ 1s     │ 0    │ online    │ 6.5%     │ 26.5mb   │ jerome   │ disabled │
│ 1   │ indexPm2    │ default     │ 1.0.0   │ cluster │ 1195     │ 1s     │ 0    │ online    │ 6.5%     │ 26.5mb   │ jerome   │ disabled │
│ 2   │ indexPm2    │ default     │ 1.0.0   │ cluster │ 1197     │ 0s     │ 0    │ online    │ 13%      │ 26.5mb   │ jerome   │ disabled │
│ 3   │ indexPm2    │ default     │ 1.0.0   │ cluster │ 1199     │ 0s     │ 0    │ online    │ 13%      │ 26.3mb   │ jerome   │ disabled │
└─────┴─────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────
*/
