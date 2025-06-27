import express from 'express';
import multer, { StorageEngine } from 'multer';
import { uploadFssaiData } from '../controllers/fssaiController';
import { authenticate } from '../middlewares/Auth.middleware';

const fssaiRouter = express.Router();

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

fssaiRouter.post(
  '/upload', authenticate,
  upload.single('fssaiDocument'),
  uploadFssaiData
);

export default fssaiRouter;
