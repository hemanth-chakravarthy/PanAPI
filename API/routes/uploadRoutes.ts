// API/routes/uploadRoutes.ts

import { Router } from 'express';
import multer from 'multer';
import { uploadSupportingDocumentToCashfree } from '../controllers/documentUploadController.js';
import asyncHandler from '../utils/asyncHandler.js'; // Import the new async handler utility

const router = Router();

// Multer storage configuration for uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
  }),
}).single('document');

// Wrap your async controller function with asyncHandler
router.post('/upload-cashfree-document', upload, asyncHandler(uploadSupportingDocumentToCashfree));

export default router;