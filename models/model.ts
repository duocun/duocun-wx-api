// import mongoose from "mongoose";

// export class Model {
//     MongooseModel: mongoose.Model<any>;

//     constructor(definition, name){
//         const Schema = new mongoose.Schema(definition, {versionKey: false});
//         this.MongooseModel = mongoose.model(name, Schema);
//     }

//     create(data){
//         const model = new this.MongooseModel(data);
//         return model.save();
//     }

//     find(query, projection=null, options=null){
//         return this.MongooseModel.find(query, projection, options);
//     }

//     // by example: {target:"$targetId", source: "$sourceId", type: "$type"}
//     groupCount(by){
//         return this.MongooseModel.aggregate([{$group:{_id: by, count:{$sum:1}}}]);
//     }
// }