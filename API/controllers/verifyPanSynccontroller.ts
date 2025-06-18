import { Request, Response } from 'express';
import axios from 'axios';
import PAN, { IPan } from '../models/pan.model';
import * as dotenv from 'dotenv';

dotenv.config();

interface CashfreeResponse {
  pan: string;
  type: string;
  reference_id: string;
  name_provided: string;
  registered_name: string;
  valid: boolean;
  father_name: string;
  message: string;
  name_match_score: string;
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

    const { data } = await axios.post<CashfreeResponse>(
      'https://api.cashfree.com/verification/pan',
      payload,
      { headers }
    );

    if (!data.valid || data.pan_status !== 'VALID') {
      res.status(400).json({ message: 'Invalid PAN or verification failed', data });
      return;
    }

    const record: Partial<IPan> = {
      pan: data.pan,
      name: data.registered_name,
      panType: data.type,
      referenceId: data.reference_id,
      status: data.pan_status,
      nameProvided: data.name_provided,
      nameMatchScore: data.name_match_score,
      nameMatchResult: data.name_match_result,
      aadhaarStatus: data.aadhaar_seeding_status,
      aadhaarStatusDesc: data.aadhaar_seeding_status_desc,
      fatherName: data.father_name,
      nameOnCard: data.name_pan_card,
      lastUpdated: data.last_updated_at,
      fetchedAt: new Date(),
    };

    await PAN.findOneAndUpdate({ pan }, record, { upsert: true });

    res.status(200).json({
      message: 'PAN verified and stored successfully (production)',
      data: record,
    });
    return;
  } catch (err: any) {
    console.error('PAN verification error:', err.message);
    res.status(500).json({
      error: 'PAN verification failed',
      details: err.response?.data || err.message,
    });
    return;
  }
};

export default verifyPanSync;
