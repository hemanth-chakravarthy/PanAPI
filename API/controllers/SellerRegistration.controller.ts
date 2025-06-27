import { NextFunction, Request, Response } from "express";
import CompanyDetail from "../models/CompanyDetails.model";
import SellerModel from "../models/Seller.model";

export const setCompanyDetails = async (req: Request, res: Response, next: NextFunction )=> {
  try {
    const sellerId = req.user?._id;
    if (!sellerId) {
      res.status(400).json({ message: "Seller ID is required" });
      return;
    }
    
    const {
      businessName,
      pincode,
      doorNumber,
      landmark,
      village,
      city,
      district,
      state,
      sameAsBusinessAddress,
      officeContactNumber,
      website,
    } = req.body; 


    const requiredFields = [
      { key: "businessName", value: businessName },
      { key: "pincode", value: pincode },
      { key: "doorNumber", value: doorNumber },
      { key: "village", value: village },
      { key: "city", value: city },
      { key: "district", value: district },
      { key: "state", value: state },
      { key: "sameAsBusinessAddress", value: sameAsBusinessAddress }
    ];

    const missingFields = requiredFields
      .filter(field => field.value === undefined || field.value === null || field.value === "")
      .map(field => field.key);

    if (missingFields.length > 0) {
      res.status(400).json({
        message: "Provide required fields",
        missingFields
      });
      return;
    }

    const logo = (req.files as any)?.logo?.[0]?.path;
    const banner = (req.files as any)?.banner?.[0]?.path;

    const business = await CompanyDetail.create({
      sellerId: sellerId,
      businessName: businessName,
      address: { pincode, doorNumber, landmark, village, city, district, state },
      sameAsBusinessAddress,
      officeContactNumber,
      website,
      logoUrl: logo,
      bannerUrl: banner,
    });
    await SellerModel.findByIdAndUpdate(sellerId, {
      CompanyDetailId: business._id,
    });

    res.status(201).json({ message: "Business created", business });
  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: "Server error" });
    next(err);
  }
};
