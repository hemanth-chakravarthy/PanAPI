import mongoose from 'mongoose';

const fssaiSchema = new mongoose.Schema({
  fssaiNumber: {
    type: String,
    required: true,
  },
  documentPath: {
    type: String,
    required: true,
  },
});

export const Fssai = mongoose.model('Fssai', fssaiSchema);
