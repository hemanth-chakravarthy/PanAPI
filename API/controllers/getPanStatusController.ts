import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import PAN, { IPan } from '../models/pan.model';

dotenv.config();

interface CashfreeStatusResponse {
  pan: string;
  type: string;
  reference_id: number;
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

const getPanStatus = async (req: Request, res: Response) => {
  try {
    const { referenceId } = req.params;

    if (!referenceId) {
      res.status(400).json({ error: 'Reference ID is required' });
      return;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'x-api-version': '2022-09-13',
    };

    const { data } = await axios.get<CashfreeStatusResponse>(
      `https://sandbox.cashfree.com/verification/pan/${referenceId}`,
      { headers }
    );

    const record: Partial<IPan> = {
      pan: data.pan,
      name: data.registered_name,
      panType: data.type,
      referenceId: data.reference_id.toString(),
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

    await PAN.findOneAndUpdate({ pan: data.pan }, record, { upsert: true });

    res.status(200).json({
      message: 'PAN verification status retrieved and saved successfully',
      data,
    });
    return;
  } catch (error: any) {
    console.error('PAN status fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch PAN status',
      details: error.response?.data || error.message,
    });
    return;
  }
};

export default getPanStatus;
