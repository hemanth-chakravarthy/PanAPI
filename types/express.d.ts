// types/express.d.ts

// Import Multer's File type if available, or define a basic one
// Multer's types usually come with @types/multer
import { File } from 'multer';

// Extend the Express Request interface
declare namespace Express {
  export interface Request {
    file?: File; // Make it optional in case some routes don't have a file
    files?: File[] | { [fieldname: string]: File[] }; // For .array() or .fields()
    // You might also need to add properties for authenticated user if you have auth middleware
    // user?: { id: string; role: string; };
  }
}