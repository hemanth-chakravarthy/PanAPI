import express from 'express';
import { handleSendOTP, handleVerifyOTP } from '../controllers/aadhaarVerificationController.js';

const router = express.Router();

router.post('/send-otp', handleSendOTP);
router.post('/verify-otp', handleVerifyOTP);

export default router;
