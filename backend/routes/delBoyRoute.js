import express from 'express';
import { registerDelBoy } from '../controllers/delBoyController.js';

const delBoyRouter = express.Router();

delBoyRouter.post("/register" , registerDelBoy);

export default delBoyRouter;