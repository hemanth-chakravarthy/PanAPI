import axios from 'axios';

/**
 * Verifies the GSTIN using Cashfree's API.
 * @param gstin - The GSTIN number to be verified.
 * @returns The verification data returned by Cashfree.
 */ 
export const verifyGstinWithCashfree = async (gstin: string): Promise<any> => {
  try {
    const payloadObj = {
      GSTIN: gstin,
      business_name: ''
    };

    const payload = JSON.stringify(payloadObj);
    const clientId = process.env.CASHFREE_CLIENT_ID!;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET!;

    const response = await axios.post(
      'https://sandbox.cashfree.com/verification/gstin',
      payload,
      {
        headers: {
          'x-client-id': clientId,
          'x-client-secret': clientSecret,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('GSTIN verification response:', response);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response from Cashfree:', error.response.data);
    }
    throw new Error(
      `Error while verifying GSTIN with Cashfree: ${(error as Error).message}`
    );
  }
};
