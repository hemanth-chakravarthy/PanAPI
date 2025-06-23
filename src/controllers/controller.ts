import { Request, Response } from 'express';
import axios from 'axios';
import Verification from '../models/data';

export const handleBankAccount = async (req: Request, res: Response) => {
  const { bankAccount, ifsc, phone, userId, name } = req.body;

  try {
    // 1) Verifica duplicado
    const existing = await Verification.findOne({ bankAccount, ifsc });
    if (existing) {
      return res.status(200).json({
        message: 'Account already exists',
        data: { phone: existing.phone },
      });
    }

    // 2) Envia requisição de verificação (async)
    const payload = {
      bank_account: bankAccount,
      ifsc,
      name,
      user_id: userId,
      phone,
    };

    const headers: any = {
      'Content-Type': 'application/json',
      'x-client-id': process.env.CASHFREE_CLIENT_ID!,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
      // 'x-cf-signature': generateSignature() // caso necessário
    };

    const initResp = await axios.post(
      'https://sandbox.cashfree.com/verification/bank-account/async',
      payload,
      { headers }
    );

    const refId = initResp.data.reference_id;
    console.log('Reference ID enviado:', refId);

    // 3) Polling até status mudar de RECEIVED
    let result: any;
    let attempts = 0;
    const maxAttempts = 6; // por exemplo: 6 tentativas
    const delay = 5000; // 5 segundos

    while (attempts < maxAttempts) {
      const statusResp = await axios.get(
        'https://sandbox.cashfree.com/verification/bank-account',
        {
          headers,
          params: { reference_id: refId.toString() },
        }
      );

      result = statusResp.data;
      console.log(`Tentativa ${attempts + 1}: Status = ${result.account_status}`);

      if (result.account_status !== 'RECEIVED') {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      attempts++;
    }

    if (result.account_status === 'RECEIVED') {
      return res.status(408).json({
        message: 'Verification still pending after multiple attempts',
        status: result.account_status,
        detail: result,
      });
    }

    if (result.account_status !== 'VALID') {
      return res.status(400).json({
        message: 'Verification failed',
        status: result.account_status,
        detail: result,
      });
    }

    // 4) Salva no banco de dados
    const saved = await Verification.create({
      name: result.name_at_bank,
      bankAccount,
      ifsc,
      phone,
      userId,
      status: result.account_status,
      utr: result.utr,
      branch: result.branch,
      bankName: result.bank_name,
    });

    return res.status(201).json({
      message: 'Verified and saved',
      data: saved,
    });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({
      message: 'Verification failed',
      error: err instanceof Error ? err.message : err,
    });
  }
};
