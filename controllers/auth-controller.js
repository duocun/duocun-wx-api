// APP_ID: string;
// APP_SECRET: string;
// TOKEN: string;
import { cfg } from '../config.js';
import { Auth } from '../models/auth.js';
import { Log } from '../models/log.js';

export class AuthController {
  
  model;

  constructor() {
    this.model = new Auth();
  }

  genWechatToken(req, res) {
    const token = cfg.WECHAT_TOKEN;
    const timestamp = req.query.timestamp;
    const nonce = req.query.nonce;
    const signature = req.query.signature;
    const echostr = req.query.echostr;

    const data = this.model.genWechatToken(token, timestamp, nonce, signature, echostr);
    res.send(data ? data : 'failed');
  }


  async getUserInfoByOpenId(req, res) {
    const openId = req.query.openId;
    const accessToken = req.query.accessToken;
    // Log.save(req.query);
    const data = await this.model.getWechatUserInfo(accessToken, openId);
    res.send(data);
  }


  async getUserInfoByAuthCode(req, res) {
    const code = req.query.code;
    // Log.save(req.query);
    const r = await this.model.getWechatAccessToken(code); // error code 40163
    if (r && r.access_token && r.openid) { // {code: 40029, msg:'invalid code rid ...'}
      // wechat token
      const accessToken = r.access_token;
      const openId = r.openid;
      // const expiresIn = r.expires_in; // 2h
      // const refreshToken = r.refresh_token;
      // const tokenId = await this.wechatLoginByOpenId(accessToken, openId);
      // return { tokenId, accessToken, openId, expiresIn };

      const data = await model.getWechatUserInfo(accessToken, openId);
      res.send(data);
    } else {
      // Log.save(r);
      res.send();
    }
  }

  //     // return  {tokenId, accessToken, openId, expiresIn}
  //   wechatLoginByCode(req, res) {
  //     const wxLoginCode = req.query.code;
  //     res.setHeader('Content-Type', 'application/json');
  //     this.accountModel.wechatLoginByCode(wxLoginCode).then((r) => {
  //       if (r && r.tokenId) {
  //         res.send(JSON.stringify(r, null, 3));
  //       } else {
  //         res.send(JSON.stringify('', null, 3));
  //       }
  //     }).catch( (error) => {
  //       // even exception,  let user login again
  //       // console.log(`err: ${error}`);
  //       res.send(JSON.stringify('', null, 3));
  //     });
  //   }

  //   // return {tokenId}
  //   wechatLoginByOpenId(req, res) {
  //     const openId = req.body.openId;
  //     const accessToken = req.body.accessToken;

  //     res.setHeader('Content-Type', 'application/json');
  //     this.accountModel.wechatLoginByOpenId(accessToken, openId).then((tokenId) => {
  //       if (tokenId) {
  //         res.send(JSON.stringify({tokenId}, null, 3));
  //       } else {
  //         res.send(JSON.stringify('', null, 3));
  //       }
  //     }).catch( (error) => {
  //       // even exception,  let user login again
  //       // console.log(`err: ${error}`);
  //       res.send(JSON.stringify('', null, 3));
  //     });
  //   }
}