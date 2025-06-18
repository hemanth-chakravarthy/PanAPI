import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface BulkPanEntry {
  pan: string;
  type: string;
  reference_id: number;
  name_provided: string;
  registered_name: string;
  father_name: string;
  valid: boolean;
  message: string;
  name_match_score: number;
  name_match_result: string;
  aadhaar_seeding_status: string;
  last_updated_at: string;
  name_pan_card: string;
  pan_status: string;
  aadhaar_seeding_status_desc: string;
}

interface BulkPanStatusResponse {
  bulk_verification_id: string;
  reference_id: string;
  count: number;
  entries: BulkPanEntry[];
}

const getBulkPanStatus = async (req: Request, res: Response) => {
  try {
    const { reference_id, bulk_verification_id } = req.query;

    if (!reference_id && !bulk_verification_id) {
      res.status(400).json({
        error: 'Either reference_id or bulk_verification_id is required',
      });
      return ;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
    };

    const params: Record<string, string> = {};
    if (reference_id) params.reference_id = reference_id as string;
    if (bulk_verification_id) params.bulk_verification_id = bulk_verification_id as string;

    const response = await axios.get<BulkPanStatusResponse>(
      'https://api.cashfree.com/verification/pan/bulk',
      { headers, params }
    );

    console.log(' Bulk PAN response:', response.data);

    res.status(200).json({
      message: 'Bulk PAN verification status retrieved successfully',
      data: response.data, 
    });
    return ;
  } catch (error: any) {
    console.error(' Bulk PAN status fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch bulk PAN status',
      details: error.response?.data || error.message,
    });
    return ;
  }
};

export default getBulkPanStatus;
