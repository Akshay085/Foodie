import express from 'express';
import { loginUser , registerUser , resetPassword, sendOtp, updatePassword , verifyOtp , updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.post("/sendOtp" , sendOtp);
userRouter.post("/verifyOtp" , verifyOtp);
userRouter.post("/updatePassword" , updatePassword);
userRouter.post("/resetPassword" , resetPassword);
userRouter.post("/updateUser" , updateUser);

export default userRouter;