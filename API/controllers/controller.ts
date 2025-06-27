import { Request, Response } from 'express';
import Seller from '../models/Seller.model';
import Shop, { IShop } from '../models/ShopDetails.model';
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

// Shop details controller
export const addShopDetails = async (req: Request, res: Response): Promise<void> => {
  
  const sellerId = req.user?.id;
  console.log('Seller ID from request:', sellerId);

  if(!sellerId){
    res.status(400).json({ error: 'invalid session' });
    return;
  }

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
      seller: sellerId, // Assuming sellerId is an object with _id property
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

    // Update the Seller model with shopID
    await Seller.findByIdAndUpdate(sellerId, {
      shopID: shop._id // Assuming shop._id is the ObjectId of the Shop
    });


    res.status(201).json({ message: 'Shop details saved successfully', shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save shop details' });
  }
};

// GST verification controller
export const gstVerification = async (req: Request, res: Response): Promise<void> => {
  const sellerId = req.user?.id;
  if (!sellerId) {
    res.status(400).send({ error: 'Invalid session' });
    return;
  }
  const { gstin } = req.body;

  if (!gstin || !sellerId) {
    res.status(400).send({ error: 'GSTIN and Seller ID are required' });
    return;
  }

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

    const gstDocument = new GSTDetails({
      ...formattedData,
      SellerId: sellerId,
    });

    if (gstDocument.status === 'Active') {
      const GSTDoc = await gstDocument.save();
      await Seller.findByIdAndUpdate(sellerId, {
        gstId: GSTDoc._id
      });
      res.status(201).json({
        message: 'GSTIN verified successfully',
        data: {
          gstin: formattedData.gstin,
          legalName: formattedData.legalName,
          taxPayerType: formattedData.taxpayerType,
          gstinStatus: formattedData.status,
        }
      });
    } else {
      res.status(200).json({ warning: 'GSTIN is not active', data: formattedData });
    }
  } catch (error) {
    console.error('GST Verification Error:', error);
    res.status(500).send({ error: 'Failed to verify GSTIN' });
  }
};
