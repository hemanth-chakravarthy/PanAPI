import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import panRoutes from './routes/pan.route';

import SellerRegistrationRoutes from './routes/SellerRegistration.routes';
import route from './routes/route';
import aadhaarRoutes from './routes/aadhaarRoutes';
import uploadRoutes from './routes/uploadRoutes';
import shopRoutes from './routes/route';
import bankRoutes from './routes/bank.route';

import { errorHandler } from './middlewares/errorHandler.middleware';

import connectDB from './config/db';

dotenv.config();

const app: Application = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/register', SellerRegistrationRoutes);
app.use('/api', route);
app.use('/api', uploadRoutes);
app.use('/api', shopRoutes);
app.use('/api/aadhaar', aadhaarRoutes);
app.use('/api/bank-verification', bankRoutes);
app.use('/api/pan', panRoutes);

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});

app.use(errorHandler);

// 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Cashfree Client ID (first 5 chars):', process.env.CASHFREE_CLIENT_ID ? process.env.CASHFREE_CLIENT_ID.substring(0, 5) : 'Not loaded');
});
