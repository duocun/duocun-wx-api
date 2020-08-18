import express from 'express';
import {AuthController} from '../controllers/auth-controller.js';

export function AuthRouter() {
    const router = express.Router();
    const controller = new AuthController();

    router.get('/userInfoByOpenId', (req, res) => { controller.getUserInfoByOpenId(req, res); });
    router.get('/userInfoByCode', (req, res) => { controller.getUserInfoByCode(req, res); });

    return router;
}