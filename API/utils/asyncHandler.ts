// API/utils/asyncHandler.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define a type for your async controller functions
// This is the common signature for Express middleware/handlers that can be async
type AsyncExpressHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | void;

const asyncHandler = (fn: AsyncExpressHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    // Ensures that any returned promise is resolved, and any errors are caught
    // and passed to the next middleware (error handler).
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;