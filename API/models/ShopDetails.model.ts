import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the business address
export interface IBusinessAddress {
  pincode: string;
  doorNumber: string;
  landmark: string;
  colony: string;
  city: string;
  district: string;
  state: string;
}

// Define the interface for the Shop document
export interface IShop extends Document {
  seller: mongoose.Types.ObjectId;
  businessName: string;
  businessAddress: IBusinessAddress;
  pickupAddressSame: boolean;
  logo: string;
  banner: string;
  selfiePhoto: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShopSchema = new Schema<IShop>({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  businessName: { type: String, required: true },
  businessAddress: {
    pincode: { type: String, required: true },
    doorNumber: { type: String, required: true },
    landmark: { type: String, required: true },
    colony: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
  },
  pickupAddressSame: { type: Boolean, required: true },
  logo: { type: String, default: '' },
  banner: { type: String, default: '' },
  selfiePhoto: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model<IShop>('Shop', ShopSchema);
