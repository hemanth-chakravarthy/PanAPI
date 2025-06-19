import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface PanLiteRequest {
  verification_id: string;
  pan: string;
  name: string;
  dob: string;
}

interface PanLiteResponse {
  verification_id: string;
  reference_id: number;
  pan: string;
  name: string;
  dob: string;
  name_match: string;
  dob_match: string;
  pan_status: string;
  status: string;
  aadhaar_seeding_status: string;
  aadhaar_seeding_status_desc: string;
}

const verifyPanLite = async (req: Request, res: Response) => {
  try {
    const { verification_id, pan, name, dob }: PanLiteRequest = req.body;

    if (!verification_id || !pan || !name || !dob) {
      res.status(400).json({
        error: 'verification_id, pan, name, and dob are required',
      });
      return ;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'Content-Type': 'application/json',
    };

    const payload = { verification_id, pan, name, dob };

    const response = await axios.post<PanLiteResponse>(
      'https://sandbox.cashfree.com/verification/pan-lite',
      payload,
      { headers }
    );

    console.log('✅ PAN Lite Response:', response.data); // debug log

    res.status(200).json({
      message: 'PAN Lite verification successful',
      data: response.data,
    });
    return ;
  } catch (error: any) {
    console.error('❌ PAN Lite verification error:', error.message);
    res.status(500).json({
      error: 'PAN Lite verification failed',
      details: error.response?.data || error.message,
    });
    return ;
  }
};

export default verifyPanLite;
