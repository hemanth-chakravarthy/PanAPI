import mongoose from 'mongoose';

const AadhaarUserSchema = new mongoose.Schema({
  name: String,
  dob: String,
  address: String
});

export default mongoose.model('AadhaarUser', AadhaarUserSchema);
