import axios from 'axios';

const API_BASE = 'https://sandbox.cashfree.com/verification';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-client-id': 'CF10328294D16H6KEI3S5S73CRUKFG',         // Replace with actual key
  'x-client-secret': 'cfsk_ma_test_69383118228bb48d6deff70ac4ff64b8_f714db3b', // Replace with actual secret
  'x-cf-signature': '103.44.0.162', // Optional unless IP is not whitelisted
};

export const sendAadhaarOTP = async (aadhaarNumber: string) => {
  try {
    const res = await axios.post(`${API_BASE}/offline-aadhaar/otp`, {
      aadhaar_number: aadhaarNumber
    }, { headers: HEADERS });

    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const verifyAadhaarOTP = async (otp: string, ref_id: string) => {
  try {
    const res = await axios.post(`${API_BASE}/offline-aadhaar/verify`, {
      otp,
      ref_id
    }, { headers: HEADERS });

    const { status, name, dob, address } = res.data;
    if (status === 'VALID') {
      return { name, dob, address };
    } else {
      return null;
    }
  } catch (error: unknown) {
    throw error;
  }
};