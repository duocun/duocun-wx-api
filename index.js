import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";

import {AuthRouter} from './routes/auth-route.js';
import {cfg} from './config.js';

const app = express();

const SVC_PATH = cfg.SVC_PATH;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use(bodyParser.json({ limit: "1mb" }));

app.get("/", (req, res) => {
    const auth = new AuthController();
    auth.genWechatToken(req, res);
});

// app.use(SVC_PATH + "/accounts", AccountRoute());
// app.use(SVC_PATH + "/activities", ActivityRoute());

// mongoose.connect(cfg.DB_CONN, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

app.use(SVC_PATH + "auth", AuthRouter());

app.listen(cfg.SVC_PORT, () => {
    console.log(`svc path: ${SVC_PATH}`);
    console.log(`API listening at http://localhost:${cfg.SVC_PORT}`);
})