import { Router } from 'express';
import twitterController from '../controllers/twitterController';

const twitterRouter = Router();

twitterRouter.post('/oauth/getRequestToken', twitterController.getRequestToken);
twitterRouter.post('/oauth/twitterLogin', twitterController.twitterLogin);

export default twitterRouter;
