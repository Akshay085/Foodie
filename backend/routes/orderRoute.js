import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { assignDelBoy, cancelOrder, listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place' , authMiddleware , placeOrder);
orderRouter.post('/verify' , verifyOrder);
orderRouter.post('/userorder' , authMiddleware , userOrder);
orderRouter.get('/list' , listOrders);
orderRouter.post('/status' , updateStatus);
orderRouter.post('/assignDelBoy' , assignDelBoy);
orderRouter.post('/cancelOrder' , cancelOrder);

export default orderRouter;