import { Request, Response } from 'express';
import Shop, { IShop } from '../models/data';

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
