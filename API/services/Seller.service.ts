import axios from 'axios';

const BASE_URL = process.env.CASHFREE_BASE_URL!;
const HEADERS = {
  'Content-Type': 'application/json',
  'x-client-id': process.env.CASHFREE_CLIENT_ID!,
  'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
  'x-api-version': '2022-01-01' // Or the latest version from Cashfree docs
};

export const sendMobileOTP = async (mobile: string, name: string) => {
  const verificationId = `VER-${Date.now()}`;

  const payload = {
    verification_id: verificationId,
    mobile_number: mobile,
    name: name,
    user_consent: {
      timestamp: new Date().toISOString(),
      purpose: 'User consent to fetch data.',
      obtained: true,
      type: 'EXPLICIT'
    },
    notification_modes: ['SMS']
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/mobile360/otp/send`,
      payload,
      { headers: HEADERS }
    );

    console.log('✅ Cashfree OTP Response:', res.data);
    return {
      referenceId: res.data.reference_id,
      verificationId: res.data.verification_id
    };
  } catch (error: any) {
    console.error('❌ sendMobileOTP error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

export const verifyMobileOTP = async (
  mobile: string,
  otp: string,
  referenceId: string,
  verificationId: string
) => {
  const payload = {
    mobile_number: mobile,
    otp,
    reference_id: referenceId,
    verification_id: verificationId
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/mobile360/otp/verify`,
      payload,
      { headers: HEADERS }
    );

    console.log('✅ OTP Verification Response:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ verifyMobileOTP error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};
