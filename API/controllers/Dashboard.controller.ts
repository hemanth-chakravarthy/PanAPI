import { Request, Response } from 'express';
import Seller from '../models/Seller.model';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const sellers = await Seller.find()
      .populate('panId')
      .populate('aadharId')
      .populate('fssaiId')
      .populate('gstId')
      .populate('bankId')
      .populate('CompanyDetailId')
      .sort({ createdAt: -1 });

    const formattedData = sellers.map((seller: any) => {
      const panDetails = seller.panId || {};
      const aadharDetails = seller.aadharId || {};
      const fssaiDetails = seller.fssaiId || {};
      const gstDetails = seller.gstId || {};
      const bankDetails = seller.bankId || {};
      const companyDetails = seller.CompanyDetailId || {};

      const businessType = panDetails.panType || '';
      const isLLPOrPvtLtd = ['LLP', 'PVT LTD', 'PRIVATE LIMITED'].includes(businessType.toUpperCase());

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
        businessName: companyDetails?.businessName || '',
        pincode: companyDetails?.address?.pincode || '',
        state: companyDetails?.address?.state || '',
        district: companyDetails?.address?.district || '',
        mandal: companyDetails?.address?.city || '',
        village: companyDetails?.address?.village || '',
        landmark: companyDetails?.address?.landmark || '',
        doorNumber: companyDetails?.address?.doorNumber || '',
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
