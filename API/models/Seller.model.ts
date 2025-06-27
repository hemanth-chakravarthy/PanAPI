import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    match: /^\d{10}$/,
    unique: true
  },
  businessType: {
    type: String,
    enum: ['shop', 'individual', 'proprietor', 'partnership', 'llp', 'pvt.ltd'],
    required: true
  },
  shopID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
  },
  panId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PAN',
  },
  aadharId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AadhaarUser',
  },
  fssaiId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fssai',
  },
  gstId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GSTDetails',
  },
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verification',
  },
  documentUploadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DocumentUpload',
  },
  CompanyDetailId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyDetail',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Seller', SellerSchema);
