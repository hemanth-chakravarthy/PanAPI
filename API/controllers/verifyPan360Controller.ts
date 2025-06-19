import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

interface Pan360Request {
  pan: string;
  verification_id: string;
  name: string;
}

interface Address {
  full_address: string;
  street: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
}

interface Pan360Response {
  status: string;
  message: string;
  reference_id: number;
  verification_id: string;
  name_provided: string;
  pan: string;
  registered_name: string;
  name_pan_card: string;
  first_name: string;
  last_name: string;
  type: string;
  gender: string;
  date_of_birth: string;
  masked_aadhaar_number: string;
  email: string;
  mobile_number: string;
  aadhaar_linked: boolean;
  address: Address;
}

const verifyPan360 = async (req: Request, res: Response) => {
  try {
    const { pan, verification_id, name }: Pan360Request = req.body;

    if (!pan || !verification_id || !name) {
      res.status(400).json({
        error: 'pan, verification_id, and name are required',
      });
      return ;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'Content-Type': 'application/json',
    };

    const payload = { pan, verification_id, name };

    const response = await axios.post<Pan360Response>(
      'https://sandbox.cashfree.com/verification/pan/advance',
      payload,
      { headers }
    );

    console.log('✅ PAN 360 Raw Response:', response.data); // optional debug

    res.status(200).json({
      message: 'PAN 360 verification successful',
      data: response.data, // ✅ pass exactly as returned
    });
    return ;
  } catch (error: any) {
    console.error('❌ PAN 360 verification error:', error.message);
    res.status(500).json({
      error: 'PAN 360 verification failed',
      details: error.response?.data || error.message,
    });
    return ;
  }
};

export default verifyPan360;
