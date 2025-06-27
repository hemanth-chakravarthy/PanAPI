import mongoose from 'mongoose';

const fssaiSchema = new mongoose.Schema({
  sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
  },
  fssaiNumber: {
    type: String,
    required: true,
  },
  documentPath: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Fssai', fssaiSchema);
