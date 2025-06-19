import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

interface BulkVerifyRequest {
  bulk_verification_id: string;
  entries: { pan: string; name?: string }[];
}

interface BulkVerifyResponse {
  reference_id: number;
  message: string;
}

const bulkVerifyPan = async (req: Request, res: Response) => {
  try {
    const { bulk_verification_id, entries }: BulkVerifyRequest = req.body;

    if (!bulk_verification_id || !Array.isArray(entries) || entries.length < 2) {
      res.status(400).json({
        error: 'bulk_verification_id and at least 2 PAN entries are required',
      });
      return;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'Content-Type': 'application/json',
    };

    const response = await axios.post<BulkVerifyResponse>(
      'https://sandbox.cashfree.com/verification/pan/bulk',
      { bulk_verification_id, entries },
      { headers }
    );

    console.log('Cashfree Bulk PAN Response:', response.data);

    res.status(200).json({
      message: 'Bulk PAN verification request sent successfully',
      data: response.data,
    });
    return;
  } catch (error: any) {
    console.error('Bulk PAN verification error:', error.message);
    res.status(500).json({
      error: 'Bulk PAN verification failed',
      details: error.response?.data || error.message,
    });
    return;
  }
};

export default bulkVerifyPan;
