import { Request, Response } from 'express';
import { Fssai } from '../models/fssaiModel.js';

export const uploadFssaiData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fssaiNumber } = req.body;
    const file = req.file as Express.Multer.File;

    if (!fssaiNumber || !file) {
      res.status(400).json({ message: 'FSSAI number or document is missing' });
      return;
    }

    const newEntry = new Fssai({
      fssaiNumber,
      documentPath: file.path,
    });

    await newEntry.save();

    res.status(201).json({ message: 'Uploaded successfully', data: newEntry });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
