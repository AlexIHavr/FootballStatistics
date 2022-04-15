import { CheckAuthRequest, CheckAuthResponse } from './../types/userTypes';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

class UserController {
  async checkAuth(
    req: Request<{}, {}, CheckAuthRequest>,
    res: Response<CheckAuthResponse>,
    next: NextFunction
  ) {
    try {
      const { userName } = await userService.checkAuth(req.body.oAuthAccessToken);

      res.json({ userName });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request<{}, {}, CheckAuthRequest>, res: Response, next: NextFunction) {
    try {
      const user = await userService.logout(req.body.oAuthAccessToken);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
