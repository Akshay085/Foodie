import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, userOrder, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place' , authMiddleware , placeOrder);
orderRouter.post('/verify' , verifyOrder);
orderRouter.post('/userorder' , authMiddleware , userOrder);
orderRouter.get('/list' , listOrders);

export default orderRouter;