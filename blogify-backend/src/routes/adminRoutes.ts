import express from 'express';
import { getAdminStats } from '../controllers/adminController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';
import errorHandler from '../error-handler';

const adminRouter = express.Router();

adminRouter.get('/stats', protect, admin, errorHandler(getAdminStats));


export default adminRouter;
