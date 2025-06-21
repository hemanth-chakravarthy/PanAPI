import { Request, Response } from 'express';
import Shop, { IShop } from '../models/data';
import { verifyGstinWithCashfree } from '../services/verifygstService';
import { formatGstDetails } from '../utils/gstFormatter';
import GSTDetails from '../models/GSTDetails';

// Define interface for the request body
interface ShopRequestBody {
  businessName: string;
  pincode: string;
  doorNumber: string;
  landmark: string;
  colony: string;
  city: string;
  district: string;
  state: string;
  pickupAddressSame: string;
}

// Shop details controller (from Mithilesh-Iruvuri branch)
export const addShopDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      businessName,
      pincode,
      doorNumber,
      landmark,
      colony,
      city,
      district,
      state,
      pickupAddressSame
    } = req.body as ShopRequestBody;

    // Type assertion for multer files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    const shop: IShop = new Shop({
      businessName,
      businessAddress: {
        pincode,
        doorNumber,
        landmark,
        colony,
        city,
        district,
        state
      },
      pickupAddressSame: pickupAddressSame === 'true',
      logo: files?.['logo']?.[0]?.filename || '',
      banner: files?.['banner']?.[0]?.filename || '',
      selfiePhoto: files?.['selfiePhoto']?.[0]?.filename || ''
    });

    await shop.save();
    res.status(201).json({ message: 'Shop details saved successfully', shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save shop details' });
  }
};

// GST verification controller (from main branch)
export const gstVerification = async (req: Request, res: Response): Promise<void> => {
  const { gstin } = req.body;

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
};
