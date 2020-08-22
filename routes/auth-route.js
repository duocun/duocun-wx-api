import express from 'express';
import {AuthController} from '../controllers/auth-controller.js';

export function AuthRouter() {
    const router = express.Router();
    const controller = new AuthController();
    
    // router.get("/", (req, res) => { controller.genWechatToken(req, res); });
    router.get('/userInfoByOpenId', (req, res) => { controller.getUserInfoByOpenId(req, res); });
    router.get('/userInfoByAuthCode', (req, res) => { controller.getUserInfoByAuthCode(req, res); });

    return router;
}