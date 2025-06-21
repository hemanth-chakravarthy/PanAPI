import { Request, Response } from 'express';
import CompanyDetail from '../models/CompanyDetails.model';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const sellers = await CompanyDetail.aggregate([
      {
        $lookup: {
          from: 'pans',
          localField: '_id',
          foreignField: 'sellerId',
          as: 'panDetails',
        },
      },
      { $addFields: { panDetails: { $arrayElemAt: ['$panDetails', 0] } } },

      {
        $lookup: {
          from: 'aadhars',
          localField: '_id',
          foreignField: 'sellerId',
          as: 'aadharDetails',
        },
      },
      { $addFields: { aadharDetails: { $arrayElemAt: ['$aadharDetails', 0] } } },

      {
        $lookup: {
          from: 'fssais',
          localField: '_id',
          foreignField: 'sellerId',
          as: 'fssaiDetails',
        },
      },
      { $addFields: { fssaiDetails: { $arrayElemAt: ['$fssaiDetails', 0] } } },

      {
        $lookup: {
          from: 'gstdetails',
          localField: '_id',
          foreignField: 'sellerId',
          as: 'gstDetails',
        },
      },
      { $addFields: { gstDetails: { $arrayElemAt: ['$gstDetails', 0] } } },

      {
        $lookup: {
          from: 'bankdetails',
          localField: '_id',
          foreignField: 'sellerId',
          as: 'bankDetails',
        },
      },
      { $addFields: { bankDetails: { $arrayElemAt: ['$bankDetails', 0] } } },

      { $sort: { createdAt: -1 } },
    ]);


    const formattedData = sellers.map(seller => {
      const businessType = seller?.panDetails?.panType || '';
      const isLLPOrPvtLtd = ['LLP', 'PVT LTD', 'PRIVATE LIMITED'].includes(businessType.toUpperCase());

      return {
        name: isLLPOrPvtLtd ? seller?.panDetails?.nameOnCard || '' : seller?.panDetails?.name || '',
        mobileNumber: seller?.officeContactNumber || '',
        emailId: seller?.email || '',
        businessType: businessType || '',
        panNumber: seller?.panDetails?.pan || '',
        aadharNumber: seller?.aadharDetails?.aadharNumber || '',
        fssaiNumber: seller?.fssaiDetails?.fssaiNumber || '',
        gstNumber: seller?.gstDetails?.gstNumber || '',
        bankAccountNumber: seller?.bankDetails?.accountNumber || '',
        ifsc: seller?.bankDetails?.ifsc || '',
        incorporationNumber: isLLPOrPvtLtd ? seller?.panDetails?.referenceId || '' : 'NILL',
        showIncorporationCertificateButton: isLLPOrPvtLtd,
        businessName: seller?.businessName || '',
        pincode: seller?.address?.pincode || '',
        state: seller?.address?.state || '',
        district: seller?.address?.district || '',
        mandal: seller?.address?.city || '', // Assuming mandal = city (adjust if needed)
        village: seller?.address?.village || '',
        landmark: seller?.address?.landmark || '',
        doorNumber: seller?.address?.doorNumber || '',
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
