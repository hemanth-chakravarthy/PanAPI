import express from 'express';
import { createAccount, verifyOTPAndCreateUser } from '../controllers/SellerCreateAccount.controller';

const router = express.Router();

router.post('/test', (req, res) => {
  res.status(200).json({ message: 'Test route for Seller routes' });
});
router.post('/createAccount', createAccount);
router.post('/verifyOtp', verifyOTPAndCreateUser);

export default router;
