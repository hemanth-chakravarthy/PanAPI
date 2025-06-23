import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    // Try both environment variable names for compatibility
    const uri: string | undefined = process.env.MONGODB_URI || process.env.MONGO_URI;
    console.log('Mongo URI:', uri); // DEBUG LINE

    if (!uri) {
      console.error('MongoDB URI is missing in .env. Please set MONGODB_URI or MONGO_URI');
      throw new Error('MongoDB URI is missing in .env');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
