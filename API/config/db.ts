import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('ALL ENV VARIABLES:', process.env);

const connectDB = async (): Promise<void> => {
  try {
    const uri: string | undefined = process.env.MONGO_URI;
    console.log('Mongo URI:', uri); // DEBUG LINE

    if (!uri) throw new Error('MongoDB URI is missing in .env');

    await mongoose.connect(uri);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
