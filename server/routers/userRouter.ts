import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.get('/getFavoriteTeams', userController.getFavoriteTeams);

userRouter.post('/checkAuth', userController.checkAuth);
userRouter.post('/logout', userController.logout);

userRouter.put('/addFavoriteTeam', userController.addFavoriteTeam);

userRouter.delete('/deleteFavoriteTeam', userController.deleteFavoriteTeam);

export default userRouter;
