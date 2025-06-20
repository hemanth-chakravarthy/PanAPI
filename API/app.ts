import dotenv from 'dotenv';
import aadhaarRoutes from './routes/aadhaarRoutes';
dotenv.config(); 

import express, { Request, Response } from 'express';
import cors from 'cors';
import db from './config/db';
import route from './routes/route';

db();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api', route);

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});

app.use('/api/aadhaar', aadhaarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


