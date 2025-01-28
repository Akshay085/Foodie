import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String , required: true },
    email: { type: String , required: true , unique: true },
    password: { type: String , required: true },
    contact: { type: Number , required: true , unique: true },
    address: { type: String , default: "Update your address" },
    city:{ type:String , default:"Update your city"},
    country:{ type:String , default:"Update your country" },
    cartData: { type: Object , default: {} }
},{minimize: false});

const userModel = mongoose.models.users || mongoose.model("users" , userSchema); 

export default userModel ;