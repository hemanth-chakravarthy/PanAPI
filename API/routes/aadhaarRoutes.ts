import express from 'express';
import { handleSendOTP, handleVerifyOTP } from '../controllers/aadhaarVerificationController';
import { authenticate } from '../middlewares/Auth.middleware';

const router = express.Router();

router.post('/send-otp', handleSendOTP);
router.post('/verify-otp',authenticate, handleVerifyOTP);

export default router;
