import { Request, Response } from 'express';
import axios from 'axios';
import Verification from '../models/bank.model';
import SellerModel from '../models/Seller.model';

export const handleBankAccount = async (req: Request, res: Response) => {
  const sellerId = req.user?.id;
  if (!sellerId) {
    res.status(400).json({ error: 'Invalid session' });
    return
  }
  const { bankAccount, ifsc, phone, userId } = req.body;

  try {
    // 1. Check if record exists
    const existing = await Verification.findOne({ bankAccount, ifsc });
    if (existing) {
      res.status(200).json({
       
        formatted: `Account already exists with Phone Number: ${existing.phone}`,
      });
      return
    }

    // 2. Authenticate with Cashfree
    const tokenResponse = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/pg/v1/authenticate`,
      {},
      {
        headers: {
          'x-client-id': process.env.CASHFREE_CLIENT_ID!,
          'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
        },
      }
    );

    const token = tokenResponse.data.data.token;

    // 3. Verify with Cashfree
    const verifyResponse = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/pg/bankaccount/validate`,
      {
        bank_account: bankAccount,
        ifsc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = verifyResponse.data;
    const data = result.data;

    if (result.status === 'SUCCESS') {
      const saved = await Verification.create({
        sellerId,
        name: data.name_on_account,
        bankAccount,
        ifsc,
        bankName: data.bank_name,
        branch: data.branch,
        city: data.city,
        phone,
        status: 'VERIFIED',
      });
      await SellerModel.findByIdAndUpdate(sellerId, {
        bankId: saved._id
      })

      res.status(201).json({
        // message: 'Verified and saved successfully',
        formatted: `Holder Name: ${saved.name}\nBank Name: ${saved.bankName}\nAccount Number: ${saved.bankAccount}\nIFSC Code: ${saved.ifsc}\nCity: ${saved.city}\nBranch: ${saved.branch}`,
      });
      return 
    }

    // 4. Save failed attempt
    await Verification.create({
      sellerId,
      bankAccount,
      ifsc,
      phone,
      userId,
      status: 'FAILED',
      reason: result.message,
    });

    res.status(400).json({
      message: 'Verification failed',
      reason: result.message,
    });
    return 

  } catch (err) {
    console.error('Verification Error:', err);
    return res.status(500).json({
      message: 'Internal server error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
  }
};
