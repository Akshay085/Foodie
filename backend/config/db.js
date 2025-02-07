import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Akshay:08052005@cluster0.wcbfp.mongodb.net/food-del');
        console.log("DB connected");
    } 
    catch (error) {
        console.log(error);
        
    }
}