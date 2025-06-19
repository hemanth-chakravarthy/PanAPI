import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import PAN from '../models/pan.model';

dotenv.config();

interface CashfreeResponse {
  pan: string;
  type: string;
  reference_id: number;
  name_provided: string;
  registered_name: string;
  valid: boolean;
  father_name: string;
  message: string;
  name_match_score: number;
  name_match_result: string;
  aadhaar_seeding_status: string;
  last_updated_at: string;
  name_pan_card: string;
  pan_status: string;
  aadhaar_seeding_status_desc: string;
}

const verifyPanSync = async (req: Request, res: Response) => {
  try {
    const { pan, name } = req.body;

    if (!pan || !name) {
      res.status(400).json({ error: 'PAN and name are required' });
      return;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'Content-Type': 'application/json',
    };

    const payload = { pan, name };

    const response = await axios.post('https://sandbox.cashfree.com/verification/pan', payload, { headers });
    const d: CashfreeResponse = response.data.data;

    if (!d.valid || d.pan_status !== 'VALID') {
      res.status(400).json({ message: 'Invalid PAN or verification failed', data: d });
      return;
    }
    
    await PAN.findOneAndUpdate({ pan: d.pan }, d, { upsert: true });

    res.status(200).json({
      pan: d.pan,
      type: d.type,
      reference_id: d.reference_id,
      name_provided: d.name_provided,
      registered_name: d.registered_name,
      valid: d.valid,
      message: d.message,
      name_match_score: d.name_match_score,
      name_match_result: d.name_match_result,
      aadhaar_seeding_status: d.aadhaar_seeding_status,
      last_updated_at: d.last_updated_at,
      name_pan_card: d.name_pan_card,
      pan_status: d.pan_status,
      aadhaar_seeding_status_desc: d.aadhaar_seeding_status_desc
    });
    return ;
  } catch (err: any) {
    console.error('PAN verification error:', err.message);
    res.status(500).json({
      error: 'PAN verification failed',
      details: err.response?.data || err.message,
    });
    return ;
  }
};

export default verifyPanSync;
