import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import foodRouter from './src/routes/foodRoute.js';
import userRouter from './src/routes/userRoute.js';
import categoryRouter from './src/routes/categoryRoute.js';
import cartRouter from './src/routes/cartRoute.js';
import 'dotenv/config';
import orderRouter from './src/routes/orderRoute.js';
import delBoyRouter from './src/routes/delBoyRoute.js';
import adminRouter from './src/routes/adminRoute.js';


//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());

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