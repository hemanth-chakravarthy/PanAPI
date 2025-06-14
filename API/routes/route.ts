import express from 'express';
import { gstVerification } from '../controllers/controller';
const router = express.Router();

router.post('/gstin/', gstVerification);

export default router;