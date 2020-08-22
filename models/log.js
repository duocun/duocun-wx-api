import https from 'https';
import { cfg } from '../config.js';

export class Log {

    static save(data) {
            const options = {
                hostname: cfg.LOG_SVC_HOST,
                path: cfg.LOG_SVC_PATH,
                port: 443,
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // 'Content-Length': Buffer.byteLength(data)
                },
            };

            const post_req = https.request(options, res => {
                let s = "";
                res.on("data", (d) => {
                    s += d;
                });

                res.on("end", r => {
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