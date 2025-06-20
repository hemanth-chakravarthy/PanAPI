import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = async () => {
  console.log("hello")
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(process.env.MONGODB_URI)
    console.error('Error connecting to MongoDB:', error);
  }
};

export default db;