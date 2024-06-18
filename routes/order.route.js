import express from 'express';
import authMidddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updateStatus, userOrder,  cancelOrder } from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/placeorder', authMidddleware, placeOrder);
orderRouter.post('/userorder', authMidddleware, userOrder);
orderRouter.get('/list', listOrders);
orderRouter.post('/update', updateStatus);
orderRouter.post('/cancel', authMidddleware, cancelOrder); 

export default orderRouter;
