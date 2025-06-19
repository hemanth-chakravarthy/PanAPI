import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import PAN, { IPan } from '../models/pan.model';

dotenv.config();

interface BulkVerifyRequest {
  bulk_verification_id: string;
  entries: { pan: string; name?: string }[];
}

interface BulkVerifyInitResponse {
  reference_id: number;
  message: string;
}

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

const bulkVerifyPan = async (req: Request, res: Response) => {
  try {
    const { bulk_verification_id, entries }: BulkVerifyRequest = req.body;

    if (!bulk_verification_id || !Array.isArray(entries) || entries.length < 2) {
      return res.status(400).json({
        error: 'bulk_verification_id and at least 2 PAN entries are required',
      });
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'x-api-version': '2022-09-13',
      'Content-Type': 'application/json',
    };

    const initResponse = await axios.post<BulkVerifyInitResponse>(
      'https://sandbox.cashfree.com/verification/pan/bulk',
      { bulk_verification_id, entries },
      { headers }
    );

    const referenceId = initResponse.data.reference_id;

    const statusResponse = await axios.get<BulkPanStatusResponse>(
      'https://sandbox.cashfree.com/verification/pan/bulk',
      {
        headers,
        params: { reference_id: referenceId },
      }
    );

    const savedRecords: string[] = [];

    for (const entry of statusResponse.data.entries) {
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
      savedRecords.push(entry.pan);
    }

    return res.status(200).json({
      message: 'Bulk PAN verification complete and entries saved to DB',
      reference_id: referenceId,
      saved: savedRecords,
    });

  } catch (error: any) {
    console.error('❌ Bulk PAN verification error:', error.message);
    return res.status(500).json({
      error: 'Bulk PAN verification failed',
      details: error.response?.data || error.message,
    });
  }
};

export default bulkVerifyPan;
