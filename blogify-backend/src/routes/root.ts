import express from 'express';
import authRouter from './authRoutes';
import postRouter from './postRoutes';
import categoryRouter from './categoryRoutes';
import adminRouter from './adminRoutes';
import commentRouter from './commentRoutes';
import userRouter from './userRoutes';
import reviewRouter from './reviewRoutes';

const rootRouter = express.Router();

rootRouter.use('/auth',authRouter);
rootRouter.use('/posts',postRouter);
rootRouter.use('/categories',categoryRouter);
rootRouter.use('/admin',adminRouter);
rootRouter.use('/comments',commentRouter);
rootRouter.use('/users',userRouter);
rootRouter.use('/reviews',reviewRouter);

export default rootRouter;