// src/models/Business.ts
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  pincode: String,
  doorNumber: String,
  landmark: String,
  village: String,
  city: String,
  district: String,
  state: String
});

const CompanyDetailsSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    address: addressSchema,
    sameAsBusinessAddress: { type: Boolean, default: false },
    officeContactNumber: { type: String },
    website: { type: String },
    logoUrl: { type: String },
    bannerUrl: { type: String }
  },
  { timestamps: true }
);

const CompanyDetail = mongoose.model("CompanyDetail", CompanyDetailsSchema);
export default CompanyDetail;
