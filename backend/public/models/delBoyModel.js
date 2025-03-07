import mongoose from "mongoose";

const delBoySchema = new mongoose.Schema({
    name: { type: String , required: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    contact: { type: Number , required: true , unique: true },
    otp: {type: Number , default: "" },
    expriredOn: {type: Date , default: "" },
    isAvailable: { type: Boolean, default: true },
    address: { type: String , required: true },
    city:{ type:String , required: true },
    country:{ type:String , required: true },
},{minimize: false , timestamps: true});

const delBoyModel = mongoose.models.delboys || mongoose.model("delboys" , delBoySchema); 

export default delBoyModel ;