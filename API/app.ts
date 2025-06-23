import dotenv from 'dotenv';
dotenv.config(); 
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import aadhaarRoutes from './routes/aadhaarRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'; 
import path from 'path';
import connectDB from './config/db.js';
import shopRoutes from './routes/route.js';
import bankRoutes from './routes/bank.route.js';

const app: Application = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', uploadRoutes);
app.use('/api', shopRoutes);
app.use('/api/aadhaar', aadhaarRoutes); 
app.use('/api/bank-verification', bankRoutes);


// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Cashfree Client ID (first 5 chars):', process.env.CASHFREE_CLIENT_ID ? process.env.CASHFREE_CLIENT_ID.substring(0, 5) : 'Not loaded');
});
