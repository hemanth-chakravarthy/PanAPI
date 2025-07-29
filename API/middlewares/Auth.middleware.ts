// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.error('❌ Access token missing', token);
    res.status(401).json({ error: 'Access token missing' });
    return
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // console.log(`Decoded token: ${JSON.stringify(decoded)}`);
    
    req.user = decoded;
    next();
  } catch {
    console.error('❌ Invalid or expired token, on catch block');
    res.status(401).json({ error: 'Invalid or expired token' });
    return
  }
};
