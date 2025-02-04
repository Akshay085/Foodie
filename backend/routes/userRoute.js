import express from 'express';
import { loginUser , registerUser , resetPassword, sendOtp, updatePassword , verifyOtp } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.post("/sendOtp" , sendOtp);
userRouter.post("/verifyOtp" , verifyOtp);
userRouter.post("/updatePassword" , updatePassword);
userRouter.post("/resetPassword" , resetPassword);

export default userRouter;