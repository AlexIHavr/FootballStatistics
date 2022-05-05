import { Router } from 'express';
import twitterRouter from './twitterRouter';
import userRouter from './userRouter';

const baseRouter = Router();

baseRouter.use('/twitter', twitterRouter);
baseRouter.use('/user', userRouter);

export default baseRouter;
