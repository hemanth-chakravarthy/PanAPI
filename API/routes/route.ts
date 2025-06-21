import express from 'express';
import { gstVerification } from '../controllers/controller.js';
import multer from 'multer';
import { uploadFssaiData } from '../controllers/fssaiController.js';
const router = express.Router();

router.post('/gst/', gstVerification);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
router.post('/upload', upload.single('document'), uploadFssaiData);
export default router;