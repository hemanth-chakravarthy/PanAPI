import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/JwtPayload';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d', // Token valid for 7 days
  });
};
