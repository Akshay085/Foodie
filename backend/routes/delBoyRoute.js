import express from 'express';
import { loginDelBoy, registerDelBoy, sendOtp, updatePassword, verifyOtp } from '../controllers/delBoyController.js';

const delBoyRouter = express.Router();

delBoyRouter.post("/register" , registerDelBoy);
delBoyRouter.post("/login" , loginDelBoy);
delBoyRouter.post("/sendOtp" , sendOtp);
delBoyRouter.post("/verifyOtp" , verifyOtp);
delBoyRouter.post("/updatePassword" , updatePassword);

export default delBoyRouter;