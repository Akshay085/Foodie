import express from 'express';
import { loginUser , registerUser , sendOtp, updatePassword, verifyOtp } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.post("/sendOtp" , sendOtp);
userRouter.post("/verifyOtp" , verifyOtp);
userRouter.post("/updatePassword" , updatePassword);

export default userRouter;