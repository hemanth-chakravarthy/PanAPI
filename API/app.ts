import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './config/db';
import panRoutes from './routes/pan.route'; 

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/pan', panRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});
