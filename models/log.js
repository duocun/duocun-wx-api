import https from 'https';
import { cfg } from '../config.js';

export class Log {

    save(data) {
            const options = {
                host: 'api.duocun.ca', //cfg.LOG_SVC_HOST,
                path: '/log', // cfg.LOG_SVC_PATH,
                port: 443,
                method: "POST",
                rejectUnauthorized: false, 
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    "Content-Type": "application/json", // 'Content-Length': Buffer.byteLength(data)
                },
            };

            const post_req = https.request(options, res => {
                let s = "";
                res.on("data", (d) => {
                    s += d;
                });

                res.on("end", r => {
                    // if(s){
                    //     const ret = JSON.parse(s);
                    //     console.log(ret);
                    // }
                    // if (s) {
                    //     const ret = JSON.parse(s);
                    //     resolve({status: 'success', data: ret, msg:''});
                    // } else {
                    //     resolve({status: 'failed', data: '', msg: ''});
                    // }
                });
            });

            post_req.on("error", (error) => {
                // const msg = JSON.stringify(error);
                // resolve({ status:'failed', data: '', msg });
            });

            post_req.write(JSON.stringify(data));
            post_req.end();
    }
}