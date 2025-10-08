import express from 'express';
import { getUsers, deleteUser, updateUserRole } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';
import { admin } from '../middlewares/adminMiddleware';
import errorHandler from '../error-handler';

const userRouter = express.Router();

userRouter.get('/', protect, admin, errorHandler(getUsers));
userRouter.delete('/:id', protect, admin, errorHandler(deleteUser));
userRouter.put('/:id/role', protect, admin, errorHandler(updateUserRole));

export default userRouter;