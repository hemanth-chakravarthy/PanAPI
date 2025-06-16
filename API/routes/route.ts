import express, { Router } from 'express';
import multer, { StorageEngine } from 'multer';
import { addShopDetails } from '../controllers/controller';

const router: Router = express.Router();

// Configure multer
const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post(
  '/shop',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
    { name: 'selfiePhoto', maxCount: 1 }
  ]),
  addShopDetails
);

export default router;
