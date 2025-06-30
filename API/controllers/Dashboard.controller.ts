import { Request, Response } from 'express';
import Seller from '../models/Seller.model';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const sellers = await Seller.find()
      .populate('shopID')
      .populate('panId')
      .populate('aadharId')
      .populate('fssaiId')
      .populate('gstId')
      .populate('bankId')
      .populate('documentUploadId')
      .populate('CompanyDetailId')
      .sort({ createdAt: -1 });

    const formattedData = sellers.map((seller: any) => {
      const panDetails = seller.panId || {};
      const aadharDetails = seller.aadharId || {};
      const fssaiDetails = seller.fssaiId || {};
      const gstDetails = seller.gstId || {};
      const bankDetails = seller.bankId || {};
      const businessType = panDetails.panType || '';
      const businessTypeUpper = businessType.toUpperCase();

      const isLLPOrPvtLtd = ['LLP', 'PVT.LTD', 'PRIVATE LIMITED', 'PARTNERSHIP'].includes(businessTypeUpper);

      const addressSource = isLLPOrPvtLtd
        ? seller.CompanyDetailId?.address || {}
        : seller.shopID?.businessAddress || {};

      const businessName = isLLPOrPvtLtd
        ? seller.CompanyDetailId?.businessName || ''
        : seller.shopID?.businessName || '';

      return {
        name: isLLPOrPvtLtd ? panDetails.nameOnCard || '' : panDetails.name || '',
        mobileNumber: seller.mobile || '',
        emailId: seller.email || '',
        businessType: businessType || '',
        panNumber: panDetails.pan || '',
        aadharNumber: aadharDetails?.aadhaarNumber || '',
        fssaiNumber: fssaiDetails?.fssaiNumber || '',
        gstNumber: gstDetails?.gstNumber || '',
        bankAccountNumber: bankDetails?.accountNumber || '',
        ifsc: bankDetails?.ifsc || '',
        incorporationNumber: isLLPOrPvtLtd ? panDetails?.referenceId || '' : 'NILL',
        showIncorporationCertificateButton: isLLPOrPvtLtd,
        businessName,

        // Address fields (merge-safe)
        pincode: addressSource?.pincode || '',
        state: addressSource?.state || '',
        district: addressSource?.district || '',
        mandal: addressSource?.city || '',
        village: addressSource?.village || '',
        landmark: addressSource?.landmark || '',
        colony: !isLLPOrPvtLtd ? addressSource?.colony || '' : '', // Only available in Shop
        doorNumber: addressSource?.doorNumber || '',
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
