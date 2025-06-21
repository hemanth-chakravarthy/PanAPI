import dotenv from 'dotenv';
dotenv.config(); 

import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/db.js';
import route from './routes/route.js';
import aadhaarRoutes from './routes/aadhaarRoutes.js';


import uploadRoutes from './routes/uploadRoutes.js'; 

db();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json()); 


app.use('/api', uploadRoutes);
app.use('/api', route);
app.use('/api/aadhaar', aadhaarRoutes); 

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Cashfree Client ID (first 5 chars):', process.env.CASHFREE_CLIENT_ID ? process.env.CASHFREE_CLIENT_ID.substring(0, 5) : 'Not loaded');
});
