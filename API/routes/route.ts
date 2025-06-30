import express, { Router } from 'express';
import multer, { StorageEngine } from 'multer';
import { addShopDetails, gstVerification } from '../controllers/controller';
import { uploadFssaiData } from '../controllers/fssaiController';
import { authenticate } from '../middlewares/Auth.middleware';

const router: Router = express.Router();

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post(
  '/shop', authenticate,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 }
  ]),
  addShopDetails
);

router.post('/gstin',authenticate, gstVerification);

router.post('/upload', upload.single('document'), uploadFssaiData);

export default router;
