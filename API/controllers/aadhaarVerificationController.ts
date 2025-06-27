import { Request, Response } from 'express';
import { sendAadhaarOTP,verifyAadhaarOTP } from '../services/aadhaarService';
import AadhaarUser from '../models/aadhaarModel';
import SellerModel from '../models/Seller.model';

export const handleSendOTP = async (req: Request, res: Response) => {
  const { aadhaar } = req.body;
  try {
    const result = await sendAadhaarOTP(aadhaar);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'OTP generation failed' });
  }
};

export const handleVerifyOTP = async (req: Request, res: Response) => {
  const { otp, ref_id } = req.body;
  try {
    const sellerId = req.user?.id; // Assuming user ID is stored in req.user
    console.log(`Seller ID from request: ${sellerId}`);
    
    if (!sellerId) {
      res.status(400).json({ error: 'Seller ID is required' });
      return
    }
    const result = await verifyAadhaarOTP(otp, ref_id);
    
    if (result) {
      const user = new AadhaarUser(result);
      user.sellerId = sellerId; // Associate Aadhaar with the seller
      await user.save();

      await SellerModel.findByIdAndUpdate(sellerId, {
        aadharId: user._id // Update seller with Aadhaar reference
      });
      res.status(200).json({ message: 'Aadhaar verified and saved', user });
    } else {
      res.status(400).json({ error: 'Invalid Aadhaar or OTP' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'OTP verification failed' });
  }
};
