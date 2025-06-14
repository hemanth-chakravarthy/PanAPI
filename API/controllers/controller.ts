import { Request, Response } from 'express';
import { verifyGstinWithCashfree } from '../services/verifygstService';
import { formatGstDetails } from '../utils/gstFormatter';
import GSTDetails from '../models/GSTDetails';

export const gstVerification = async (req: Request, res: Response): Promise <void> => {
  const { gstin }= req.body;

  try {
    const gstData = await GSTDetails.findOne({ gstin });
    if (gstData) {
      console.log('GSTIN found in database:', gstData);
      res.status(200).json({
        message: 'GSTIN already exists in the database',
        data: gstData
      });
      return;
    }

    const externalGstData = await verifyGstinWithCashfree(gstin);
    const formattedData = formatGstDetails(externalGstData);
    const gstDocument = new GSTDetails(formattedData);
    await gstDocument.save();

    
    res.status(201).json({
      message: 'GSTIN verified successfully',
      data: {
        gstin: formattedData.gstin,
        legalName: formattedData.legalName,
        taxPayerType: formattedData.taxpayerType,
        gstinStatus: formattedData.status,
      }
    });
  } catch (error) {
    console.error('GST Verification Error:', error);
    res.status(500).send({ error: 'Failed to verify GSTIN' });
  }
}