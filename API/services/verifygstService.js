const axios = require('axios');

exports.verifyGstinWithCashfree = async (gstin) => {
  const response = await axios.post(
    'https://api.cashfree.com/verification/v1/gstin',
    { gstin },
    {
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
