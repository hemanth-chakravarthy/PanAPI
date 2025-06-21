import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db';
import shopRoutes from './routes/route';
import aadhaarRoutes from './routes/aadhaarRoutes';

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
app.use('/api', shopRoutes);
app.use('/api/aadhaar', aadhaarRoutes);

// Test route
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});

// Server
const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
