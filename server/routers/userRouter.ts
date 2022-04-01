import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/checkAuth', userController.checkAuth);
userRouter.post('/logout', userController.logout);

export default userRouter;
