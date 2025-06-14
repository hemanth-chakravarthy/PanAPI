import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import db from './config/db';
import route from './routes/route';

db();
dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' 
}));

// Parsing middleware
app.use(express.json());
app.use('/api', route);
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'This is a test' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
