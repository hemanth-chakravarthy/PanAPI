// routes/dashboardRoutes.ts
import express from 'express';
import { getDashboardData } from '../controllers/Dashboard.controller';

const router = express.Router();

router.get('/dashboard', getDashboardData);

export default router;
