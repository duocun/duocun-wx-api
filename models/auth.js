
import crypto from 'crypto';
import { cfg } from '../config.js';
import { Log } from './log.js';

export class Auth {
    genWechatToken(token, timestamp, nonce, signature, echostr) {
        try {
            const list = [token, timestamp, nonce].sort();
            const sha1 = crypto.createHash('sha1');
            const s = list.join('');
            const hash = sha1.update(s).digest('hex');
            Log.save({msg: `genWechatToken hash: ${hash}`});
            Log.save({msg: `genWechatToken signature: ${signature}`});
            if (hash === signature) {
                return echostr;
            } else {
                return '';
            }
        } catch (e) {
            return '';
        }
    }

    //   return {   
    //     "openid":" OPENID",
    //     " nickname": NICKNAME,
    //     "sex":"1",
    //     "province":"PROVINCE"
    //     "city":"CITY",
    //     "country":"COUNTRY",
    //     "headimgurl":"http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
    //     "privilege":[ "PRIVILEGE1" "PRIVILEGE2"     ],
    //     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    // }
    getWechatUserInfo(accessToken, openId) {
        let url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN';

        return new Promise((resolve, reject) => {
            https.get(url, (res1) => {
                let data = '';
                res1.on('data', (d) => {
                    data += d;
                });

                res1.on('end', () => {
                    if (data) {
                        Log.save({msg: `getWechatUserInfo data: ${data}`});
                        const s = JSON.parse(data);
                        if (s && s.openid) {
                            resolve(s);
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                    }
                });
            });
        });
    }

    getWechatAccessToken(authCode) {
        const APP_ID = cfg.WECHAT_APP_ID;
        const SECRET = cfg.WECHAT_APP_SECRET;
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APP_ID}&secret=${SECRET}&code=${authCode}'&grant_type=authorization_code`;

        return new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let data = '';
                res.on('data', (d) => {
                    data += d;
                });

                res.on('end', () => {
                    Log.save({msg: `getWechatAccessToken data: ${data}`});
                    if (data) {
                        const s = JSON.parse(data);
                        if (s && s.access_token) {
                            resolve(s);
                        } else {
                            resolve({ code: s.errcode, msg: s.errmsg });
                        }
                    } else {
                        resolve({ code: -2, msg: 'wechat no response' });
                    }
                });
            });
        });
    }

    // // data: {
    // //   x.openid,
    // //   x.nickname,
    // //   x.headimgurl,
    // //   x.sex
    // // }
    // wechatSignup(data) {
    //     const self = this;

    //     return new Promise((resolve, reject) => {

    //         const options = {
    //             hostname: cfg.ACCOUNT_SVC_HOST,
    //             port: 443,
    //             path: ACCOUNT_SVC_PATH,
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json", // 'Content-Length': Buffer.byteLength(data)
    //             },
    //         };

    //         const post_req = https.request(options, (res) => {
    //             let s = "";
    //             res.on("data", (d) => {
    //                 s += d;
    //             });

    //             res.on("end", (r) => {
    //                 if (s) {
    //                     const ret = JSON.parse(s);
    //                     resolve({status: 'success', data: ret, msg:''});
    //                 } else {
    //                     resolve({status: 'failed', data: '', msg: ''});
    //                 }
    //             });
    //         });

    //         post_req.on("error", (error) => {
    //             const msg = JSON.stringify(error);
    //             resolve({ status:'failed', data: '', msg });
    //         });

    //         post_req.write(JSON.stringify(params));
    //         post_req.end();
    //     });
    // }

    // // return tokenId
    // async wechatLoginByOpenId(accessToken, openId) {
    //     try {
    //         const x = await this.getWechatUserInfo(accessToken, openId);
    //         if (x && x.openid) {
    //             const r = await this.wechatSignup(x);
    //             const account = r.data;
    //             if (account && account._id) {
    //                 const accountId = `${account._id}`;
    //                 const tokenId = jwt.sign({ accountId }, this.cfg.JWT.SECRET, {
    //                     expiresIn: "30d",
    //                 }); // SHA256
    //                 return tokenId;
    //             } else {
    //                 // await this.eventLogModel.addLogToDB(
    //                 //     DEBUG_ACCOUNT_ID,
    //                 //     "signup by wechat",
    //                 //     "",
    //                 //     "signup by wechat fail"
    //                 // );
    //                 return null;
    //             }
    //         } else {
    //             // await this.eventLogModel.addLogToDB(
    //             //     DEBUG_ACCOUNT_ID,
    //             //     "login by openid",
    //             //     "",
    //             //     "wechat get user info fail"
    //             // );
    //             return null;
    //         }
    //     } catch (err) {
    //         // const message = `accessToken: ${accessToken}  , openId: ${openId}, msg: ${
    //         //     err || "ByOpenId Exception"
    //         //     }`;
    //         // await this.eventLogModel.addLogToDB(
    //         //     DEBUG_ACCOUNT_ID,
    //         //     "login by openid",
    //         //     "",
    //         //     message
    //         // );
    //         return null;
    //     }
    // }

    // // code [string] --- wechat authentication code
    // // return {tokenId, accessToken, openId, expiresIn}
    // async wechatLoginByCode(code) {
    //     if (code) {
    //         try {
    //             const r = await this.getWechatAccessToken(code); // error code 40163
    //             if (r && r.access_token && r.openid) {
    //                 // wechat token
    //                 const accessToken = r.access_token;
    //                 const openId = r.openid;
    //                 const expiresIn = r.expires_in; // 2h
    //                 const refreshToken = r.refresh_token;
    //                 const tokenId = await this.wechatLoginByOpenId(accessToken, openId);
    //                 return { tokenId, accessToken, openId, expiresIn };
    //             } else {
    //                 // const message = `code: ${code}, errCode: ${r && r.code}, errMsg: ${
    //                 //     r & r.msg || "LoginByCode Exception"
    //                 //     }`;
    //                 // console.error(message);
    //                 // await this.eventLogModel.addLogToDB(
    //                 //     DEBUG_ACCOUNT_ID,
    //                 //     "login by code",
    //                 //     "",
    //                 //     message
    //                 // );
    //                 return null;
    //             }
    //         } catch (e) {
    //             console.error(e);
    //             return null;
    //         }
    //     } else {
    //         // await this.eventLogModel.addLogToDB(
    //         //     DEBUG_ACCOUNT_ID,
    //         //     "login by code",
    //         //     "",
    //         //     "Empty wechat authCode"
    //         // );
    //         return null;
    //     }
    // }

}