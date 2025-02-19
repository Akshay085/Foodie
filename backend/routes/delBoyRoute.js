import express from 'express';
import { getAvailableDelBoys, listDelBoy, listOrders, loginDelBoy, registerDelBoy, sendOtp, updatePassword, updateStatusByDelBoy, verifyOtp } from '../controllers/delBoyController.js';

const delBoyRouter = express.Router();

delBoyRouter.post("/register" , registerDelBoy);
delBoyRouter.post("/login" , loginDelBoy);
delBoyRouter.get("/list" , listDelBoy);
delBoyRouter.post("/sendOtp" , sendOtp);
delBoyRouter.post("/verifyOtp" , verifyOtp);
delBoyRouter.post("/updatePassword" , updatePassword);
delBoyRouter.post("/updateStatusByDelBoy" , updateStatusByDelBoy);
delBoyRouter.get("/getAvailableDelBoys" , getAvailableDelBoys);
delBoyRouter.post("/listOrder" , listOrders);

export default delBoyRouter;