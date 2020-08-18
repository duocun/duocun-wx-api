// import {Request, Response} from "express";
// import { Model } from "../models/model";
// // import { DB } from "../db";

// // import path from 'path';
// // import { getLogger } from '../lib/logger'

// // const logger = getLogger(path.basename(__filename));

// import * as moment from  'moment';

// export const Code = {
//   SUCCESS: 'success',
//   FAIL: 'fail'
// }

// export class Controller {
//   public model: Model;
//   constructor(model: any) {
//     this.model = model;
//   }

//   async create(req:Request, res: Response){
//     const activity: any = req.body;
//     activity.created = moment.utc().toISOString();
//     const r: any = await this.model.create(activity);

//     res.setHeader('Content-Type', 'application/json');
//     res.send({code: 'success'});
//   }

//   async find(req:Request, res: Response){
//     const r: any = await this.model.find({});

//     res.setHeader('Content-Type', 'application/json');
//     res.send({code: 'success'});
//   }


// }