import express from 'express';
import { createSellerAccount } from '../controllers/SellerCreateAccount.controller'

const router = express.Router();

router.post('/test', (req, res) => {
  res.status(200).json({ message: 'Test route for Seller routes' });
});
router.post('/createAccount', createSellerAccount);

export default router;
