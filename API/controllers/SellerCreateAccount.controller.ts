import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Seller from '../models/Seller.model';
import { generateToken } from '../utils/JWT';

export const createSellerAccount = async (req: Request, res: Response) => {
  const { name, email, mobile, businessType } = req.body;

  if (!name || !email || !mobile || !businessType) {
    res.status(400).json({ error: 'All fields are required' });
    return 
  }

  try {
    // check if already exists
    const existing = await Seller.findOne({ $or: [{ email }, { mobile }] });
    if (existing) {
      res.status(409).json({ error: 'Email or mobile already registered' });
      return 
    }

    const sellerId = `SELLER-${uuidv4()}`;

    const seller = new Seller({
      sellerId,
      name,
      email,
      mobile,
      businessType
    });

    await seller.save();

    const token = generateToken({
      id: seller._id,
      uid: seller.sellerId,
      email: seller.email,
      mobile: seller.mobile
    });

    res.status(201).json({
      message: 'Seller account created successfully',
      user: seller,
      token
    });
    return 

  } catch (err: any) {
    console.error('❌ Error creating seller:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
    return
  }
};
