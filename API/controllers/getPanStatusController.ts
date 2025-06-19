import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

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
    };

    const { data } = await axios.get<CashfreeStatusResponse>(
<<<<<<< HEAD
      `https://sandbox.cashfree.com/verification/pan/{reference_id}`,
=======
      `https://sandbox.cashfree.com/verification/pan/${referenceId}`,
>>>>>>> 5aa832d3057870c206ce0aad430613260f32508d
      { headers }
    );

    res.status(200).json({
      message: 'PAN verification status retrieved successfully (production)',
      data, 
    });
    return;
  } catch (error: any) {
    console.error('PAN status fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch PAN status',
      details: error.response?.data || error.message,
    });
    return ;
  }
};

export default getPanStatus;
