import { Request, Response } from 'express';
import { generateToken } from '../utils/JWT';
import { sendMobileOTP, verifyMobileOTP } from '../services/Seller.service';
import Seller from '../models/Seller.model';

const tempStore: Map<string, any> = new Map(); // Replace with Redis in production

export const createAccount = async (req: Request, res: Response) => {
  const { name, email, mobile, businessType } = req.body;

  if (!name || !email || !mobile || !businessType) {
    res.status(400).json({ error: 'All fields are required' });
    return 
  }

  console.log(`Received request to create account with mobile: ${mobile}, email: ${email}`);

  try {
    const existing = await Seller.findOne({ email });
    if (existing) {
      res.status(409).json({ error: 'Email already exists' });
      return 
    }

    const { referenceId, verificationId } = await sendMobileOTP(mobile, name);

    tempStore.set(mobile, {
      name,
      email,
      businessType,
      referenceId,
      verificationId
    });

    res.status(200).json({
      message: 'OTP sent successfully',
      referenceId,
      verificationId
    });
    return
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to send OTP' });
    return
  }
};

export const verifyOTPAndCreateUser = async (req: Request, res: Response) => {
  const { mobile, otp } = req.body;

  const tempData = tempStore.get(mobile);
  if (!tempData) {
    res.status(400).json({ error: 'No OTP session found for this mobile number' });
    return
  }

  try {
    const verifyRes = await verifyMobileOTP(
      mobile,
      otp,
      tempData.referenceId,
      tempData.verificationId
    );

    if (verifyRes.status === 'VERIFIED') {
      const seller = new Seller({
        name: tempData.name,
        email: tempData.email,
        mobile,
        businessType: tempData.businessType
      });
      await seller.save();

      const token = generateToken({
        id: seller._id,
        mobile: seller.mobile,
        email: seller.email
      });

      tempStore.delete(mobile);

      res.status(201).json({
        message: 'Seller created successfully',
        user: seller,
        token
      });
      return
    }

    res.status(400).json({ error: 'OTP verification failed' });
    return
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to verify OTP' });
    return
  }
};
