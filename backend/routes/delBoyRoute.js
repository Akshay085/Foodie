import express from 'express';
import { listDelBoy, loginDelBoy, registerDelBoy, sendOtp, updatePassword, verifyOtp } from '../controllers/delBoyController.js';

const delBoyRouter = express.Router();

delBoyRouter.post("/register" , registerDelBoy);
delBoyRouter.post("/login" , loginDelBoy);
delBoyRouter.get("/list" , listDelBoy);
delBoyRouter.post("/sendOtp" , sendOtp);
delBoyRouter.post("/verifyOtp" , verifyOtp);
delBoyRouter.post("/updatePassword" , updatePassword);

export default delBoyRouter;