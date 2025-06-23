import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import PAN, { IPan } from '../models/pan.model'; 

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
      return;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
    };

    const params: Record<string, string> = {};
    if (reference_id) params.reference_id = reference_id as string;
    if (bulk_verification_id) params.bulk_verification_id = bulk_verification_id as string;

    const response = await axios.get<BulkPanStatusResponse>(
      'https://sandbox.cashfree.com/verification/pan/bulk',
      { headers, params }
    );

    const bulkEntries = response.data.entries;

    for (const entry of bulkEntries) {
      const record: Partial<IPan> = {
        pan: entry.pan,
        name: entry.registered_name,
        panType: entry.type,
        referenceId: entry.reference_id.toString(),
        status: entry.pan_status,
        nameProvided: entry.name_provided,
        nameMatchScore: entry.name_match_score.toString(),
        nameMatchResult: entry.name_match_result,
        aadhaarStatus: entry.aadhaar_seeding_status,
        aadhaarStatusDesc: entry.aadhaar_seeding_status_desc,
        fatherName: entry.father_name,
        nameOnCard: entry.name_pan_card,
        lastUpdated: entry.last_updated_at,
        fetchedAt: new Date(),
      };

      await PAN.findOneAndUpdate({ pan: entry.pan }, record, { upsert: true });
    }

    res.status(200).json({
      message: 'Bulk PAN verification status retrieved and saved successfully',
      data: response.data,
    });
    return;
  } catch (error: any) {
    console.error('Bulk PAN status fetch error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch bulk PAN status',
      details: error.response?.data || error.message,
    });
    return;
  }
};

export default getBulkPanStatus;
