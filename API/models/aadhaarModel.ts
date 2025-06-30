import mongoose from 'mongoose';

const AadhaarUserSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
  },
  name: String,
  dob: String,
  address: String
});

export default mongoose.model('AadhaarUser', AadhaarUserSchema);
