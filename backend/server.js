import express from 'express';
import cors from 'cors';
import { connectDB } from './public/config/db.js';
import foodRouter from './public/routes/foodRoute.js';
import userRouter from './public/routes/userRoute.js';
import categoryRouter from './public/routes/categoryRoute.js';
import cartRouter from './public/routes/cartRoute.js';
import 'dotenv/config';
import orderRouter from './public/routes/orderRoute.js';
import delBoyRouter from './public/routes/delBoyRoute.js';
import adminRouter from './public/routes/adminRoute.js';


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