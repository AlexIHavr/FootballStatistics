import { Router } from 'express';
import userController from '../controllers/userController';
import validationMiddleware from '../middlewares/validationMiddleware';
import validationSchemas from '../schemas/validationSchemas';

const userRouter = Router();

userRouter.get('/getFavoriteTeams', userController.getFavoriteTeams);

userRouter.post('/checkAuth', userController.checkAuth);
userRouter.post('/logout', userController.logout);

userRouter.put('/addFavoriteTeam', userController.addFavoriteTeam);
userRouter.put(
  '/setUserData',
  validationMiddleware(validationSchemas.userDataSchema),
  userController.setUserData,
);

userRouter.delete('/deleteFavoriteTeam', userController.deleteFavoriteTeam);

export default userRouter;
