import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Atlas connected');
  } catch (error: any) {
    console.log('URI:', process.env.MONGO_URI);
    console.error('MongoDB Atlas connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
