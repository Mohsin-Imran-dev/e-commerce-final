import express from 'express';
import {loginUser, registerUser, adminLogin} from '../controllers/userController.js';
import {subscribeNewsletter, listSubscribers} from '../controllers/subscirbeController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/subscribe', authUser, subscribeNewsletter);
// Route (Admin protection ke sath)
userRouter.get('/subscribers-list', adminAuth, listSubscribers);
export default userRouter;