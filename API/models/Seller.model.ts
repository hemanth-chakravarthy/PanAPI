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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Seller', SellerSchema);
