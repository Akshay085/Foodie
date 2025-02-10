import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String , required: true , maxlength: 30},
    email: { type: String , required: true , unique: true , maxlength: 40 },
    password: { type: String , required: true },
    contact: { type: Number , required: true , unique: true , minlength: 10 , maxlength: 10 },
    otp: {type: Number , default: "" },
    expriredOn: {type: Date , default: "" },
    address: { type: String , default: "" , maxlength: 500},
    city:{ type:String , default: "" , maxlength: 30},
    country:{ type:String , default: "" , maxlength: 30},
    cartData: { type: Object , default: {} }
},{minimize: false , timestamps: true});

const userModel = mongoose.models.users || mongoose.model("users" , userSchema); 

export default userModel ;
