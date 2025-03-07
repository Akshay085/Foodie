import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT);
        console.log("DB connected");
    } 
    catch (error) {
        console.log(error);
        
    }
}