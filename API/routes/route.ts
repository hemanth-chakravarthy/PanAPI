import express from 'express';
import { gstVerification } from '../controllers/controller';
const router = express.Router();

router.post('/gst/', gstVerification);

export default router;