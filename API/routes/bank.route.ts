import express from 'express';
import { handleBankAccount } from '../controllers/bank.controller';
import { authenticate } from '../middlewares/Auth.middleware';

const router = express.Router();

const asyncHandler = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/verify',authenticate, handleBankAccount);

export default router;
