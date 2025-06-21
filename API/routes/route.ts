import express, { Router } from 'express';
import multer, { StorageEngine } from 'multer';
import { addShopDetails, gstVerification } from '../controllers/controller';
import { uploadFssaiData } from '../controllers/fssaiController';

const router: Router = express.Router();

// Configure multer storage
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Shop details route (from Mithilesh-Iruvuri branch)
router.post(
  '/shop',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 }
  ]),
  addShopDetails
);

// GST verification route (from main branch)
router.post('/gst/', gstVerification);

// FSSAI upload route (from main branch)
router.post('/upload', upload.single('document'), uploadFssaiData);

export default router;
