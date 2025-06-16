import express, { Application } from 'express';
import connectDB from './config/db';
import shopRoutes from './routes/route';
import cors from 'cors';
import path from 'path';

const app: Application = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', shopRoutes);

// Server
const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
