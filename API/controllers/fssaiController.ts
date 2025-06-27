import { Request, Response } from 'express';
import Fssai from '../models/fssaiModel'; 
import SellerModel from '../models/Seller.model';

export const uploadFssaiData = async (req: Request, res: Response): Promise<void> => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { fssaiNumber } = req.body;

    if (!fssaiNumber || !/^\d{14}$/.test(fssaiNumber)) {
      res.status(400).json({ message: 'Invalid or missing FSSAI number' });
      return;
    }

    const file = req.file; // 👈 using req.file for single file uploads

    if (!file) {
      res.status(400).json({ message: 'FSSAI document file is missing' });
      return;
    }

    const documentPath = file.filename;

    const newEntry = new Fssai({
      sellerId,
      fssaiNumber,
      documentPath
    });

    await newEntry.save();

    await SellerModel.findByIdAndUpdate(sellerId, {
      fssaiId: newEntry._id,
    });

    res.status(201).json({ message: 'Uploaded successfully', data: newEntry });
  } catch (error: any) {
    console.error('Upload error:', error.message, error.stack);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
};
