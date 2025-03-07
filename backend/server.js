import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import cartRouter from './routes/cartRoute.js';
import 'dotenv/config';
import orderRouter from './routes/orderRoute.js';
import delBoyRouter from './routes/delBoyRoute.js';
import adminRouter from './routes/adminRoute.js';


//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.options("*", cors());

//db connection
connectDB();

//api endpoints
app.use("/api/food" , foodRouter);
app.use("/api/user" , userRouter);
app.use("/api/category" , categoryRouter);
app.use("/api/cart" , cartRouter);
app.use("/api/order" , orderRouter);
app.use("/api/delBoy" , delBoyRouter);
app.use("/api/admin" , adminRouter);

app.get('/',(req,res)=>{
    res.send("API Working");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})