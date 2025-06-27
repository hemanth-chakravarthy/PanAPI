import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import PAN, { PanData } from '../models/pan.model'; //route
import SellerModel from '../models/Seller.model';

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

    const sellerID = req.user?.id;
    console.log('Seller ID from request:', sellerID);
    
    if (!sellerID) {
      res.status(400).json({ error: 'Invalid session' });
      return;
    }

    const { pan, name } = req.body;

    if (!pan || !name) {
      res.status(400).json({ error: 'PAN and name are required' });
      return;
    }

    const headers = {
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      'x-api-version': '2022-09-13',
      'Content-Type': 'application/json',
    };

    const payload = { pan, name };

    const response = await axios.post<CashfreeResponse>(
      'https://sandbox.cashfree.com/verification/pan',
      payload,
      { headers }
    );

    const d= response.data;
    console.log('PAN verification response:', d);


    if (!d.valid || d.pan_status !== 'VALID') {
      res.status(400).json({
        message: 'Invalid PAN or verification failed',
        data: d,
      });
      return;
    }
    const panData: PanData = {
      sellerId: sellerID, // Assuming sellerID is a valid ObjectId
      pan: d.pan,
      name: d.registered_name,
      panType: d.type,
      referenceId: d.reference_id.toString(),
      status: d.valid ? 'VALID' : 'INVALID',
      nameProvided: d.name_provided,
      nameMatchScore: d.name_match_score,
      nameMatchResult: d.name_match_result,
      aadhaarStatus: d.aadhaar_seeding_status,
      aadhaarStatusDesc: d.aadhaar_seeding_status_desc,
      fatherName: d.father_name || '',
      nameOnCard: d.name_pan_card || '',
      lastUpdated: d.last_updated_at,
      fetchedAt: new Date(),
    };

    const panDoc = await PAN.findOneAndUpdate(
      { pan: panData.pan },
      { $set: panData },
      { upsert: true, new: true }
    );
    
    await SellerModel.findByIdAndUpdate(sellerID,{
      panId: panDoc._id
    })

    res.status(200).json({
      sellerID: sellerID,
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
    })
    return

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
