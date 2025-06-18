import mongoose, { Schema, Document, model } from 'mongoose';

// Define plain interface
export interface PanData {
  pan: string;
  name: string;
  panType: string;
  referenceId: string;
  status: string;
  nameProvided: string;
  nameMatchScore: string;
  nameMatchResult: string;
  aadhaarStatus: string;
  aadhaarStatusDesc: string;
  fatherName: string;
  nameOnCard: string;
  lastUpdated: string;
  fetchedAt: Date;
  sellerId: mongoose.Types.ObjectId; // ✅ Add this
}

// Extend Mongoose Document
export interface IPan extends Document, PanData {}

const PanSchema = new Schema<IPan>({
  pan: { type: String, required: true, unique: true },
  name: { type: String },
  panType: { type: String },
  referenceId: { type: String },
  status: { type: String },
  nameProvided: { type: String },
  nameMatchScore: { type: String },
  nameMatchResult: { type: String },
  aadhaarStatus: { type: String },
  aadhaarStatusDesc: { type: String },
  fatherName: { type: String },
  nameOnCard: { type: String },
  lastUpdated: { type: String },
  fetchedAt: { type: Date, default: Date.now },

  // ✅ Add sellerId reference
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'CompanyDetail',
    required: true,
  },
});

const PanModel = model<IPan>('PAN', PanSchema);
export default PanModel;
