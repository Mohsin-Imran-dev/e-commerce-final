import express from "express";
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  updatePaymentStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth , allOrders); 
orderRouter.post('/status', adminAuth , updateStatus);

// Payment Features
orderRouter.post('/place',authUser, placeOrder); // COD
orderRouter.post('/stripe', authUser , placeOrderStripe); //stripe


// User Feature
orderRouter.post('/userorders', authUser , userOrders);

// Verify Stripe Payment
orderRouter.post('/verifyStripe', authUser, verifyStripe );

// Verify COD Payment
orderRouter.post('/payment-status', adminAuth, updatePaymentStatus);


export default orderRouter;