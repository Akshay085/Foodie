import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String , required: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    contact: { type: Number , required: true , unique: true },
    otp: {type: Number , default: ""},
    expriredOn: {type: Date , default: "" },
    address: { type: String , default: "" },
    city:{ type:String , default: "" },
    country:{ type:String , default: "" },
    cartData: { type: Object , default: {} }
},{minimize: false , timestamps: true});

const userModel = mongoose.models.users || mongoose.model("users" , userSchema); 

export default userModel ;
