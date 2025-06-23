import { Request, Response } from 'express';
import { sendAadhaarOTP,verifyAadhaarOTP } from '../services/aadhaarService.js';
import AadhaarUser from '../models/aadhaarModel.js';

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
    const result = await verifyAadhaarOTP(otp, ref_id);

    if (result) {
      const user = new AadhaarUser(result);
      await user.save();
      res.status(200).json({ message: 'Aadhaar verified and saved', user });
    } else {
      res.status(400).json({ error: 'Invalid Aadhaar or OTP' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'OTP verification failed' });
  }
};
