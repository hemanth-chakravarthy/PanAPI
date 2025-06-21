// API/controllers/documentUploadController.ts
import { Request, Response, NextFunction } from 'express';
// import DocumentUploadService from '../services/documentUploadService'; // You might not need this import if you remove all Cashfree interactions
import DocumentModel from '../models/documentModel.js';
import fs from 'fs/promises'; // Import fs for file deletion if needed

export const uploadSupportingDocumentToCashfree = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const { originalname, mimetype, size, path } = req.file;
        const { sellerId, documentType } = req.body;

        if (!sellerId || !documentType) {
            // You might want to delete the temporarily uploaded file here if these are missing
            if (req.file) {
                await fs.unlink(req.file.path); // Delete the file if validation fails
            }
            return res.status(400).json({ success: false, message: 'Seller ID and Document Type are required.' });
        }

        // 1. Save initial document metadata to DB (this part remains)
        const newDocument = new DocumentModel({
            sellerId: sellerId,
            documentType: documentType,
            originalName: originalname,
            mimeType: mimetype,
            fileSize: size,
            filePath: path, // Path to the temporarily stored file on your server
            uploadDate: new Date(),
            cashfreeStatus: 'UPLOADED_TO_SERVER' // Change status to reflect server storage, not Cashfree
            // You can remove cashfreeUploadId if not needed
        });

        const savedDocument = await newDocument.save();
        console.log('Document saved to DB (on server):', savedDocument);

        // --- REMOVE THE CASHFREE API CALL AND RELATED DB UPDATE ---
        // const cashfreeResponse = await DocumentUploadService.uploadDocument(path, documentType, sellerId);
        // savedDocument.cashfreeUploadId = cashfreeResponse.uploadId || 'N/A';
        // savedDocument.cashfreeStatus = cashfreeResponse.status || 'UPLOADED';
        // await savedDocument.save();
        // console.log('Document metadata updated with Cashfree response.');
        // -----------------------------------------------------------

        res.status(200).json({
            success: true,
            message: 'Document uploaded and stored on server successfully.',
            data: {
                documentId: savedDocument._id,
                filePath: savedDocument.filePath // Optional: send back the path if helpful for debugging/further use
            }
        });

    } catch (error) {
        console.error('Error during document upload:', error);
        // If an error occurs after file upload but before successful DB save, you might want to delete the file
        if (req.file && error) { // Add error condition to ensure file exists and there was an error
            await fs.unlink(req.file.path); // Delete the temp file
        }
        next(error); // Pass error to Express error handler
    }
};