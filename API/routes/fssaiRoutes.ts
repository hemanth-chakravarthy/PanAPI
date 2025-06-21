import express from 'express';
import multer from 'multer';
import { uploadFssaiData } from '../controllers/fssaiController.js';

const fssaiRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

fssaiRouter.post('/upload', upload.single('document'), uploadFssaiData);

export default fssaiRouter;
