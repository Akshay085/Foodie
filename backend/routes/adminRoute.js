import express from 'express';
import { loginAdmin } from '../controllers/adminController';

const adminRouter = express.Router();

adminRouter.post("/login" , loginAdmin);

export default adminRouter;