import {
  CheckAuthRequest,
  FavoriteTeamRequest,
  GetFavoriteTeamsResponse,
  UserData,
} from './../types/userTypes';
import { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import cookieService from '../services/cookieService';
import { OAUTH_ACCESS_TOKEN } from '../constants/twitterConstants';
import ApiError from '../errors/ApiError';

class UserController {
  async checkAuth(
    req: Request<any, any, CheckAuthRequest>,
    res: Response<UserData>,
    next: NextFunction,
  ) {
    try {
      const { name, birthDay, email } = await userService.checkAuth(req.body.oAuthAccessToken);

      if (!cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)) {
        throw ApiError.Unauthorized('Invalid oAuth access token.');
      }

      res.json({ name, birthDay, email });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request<any, any, CheckAuthRequest>, res: Response, next: NextFunction) {
    try {
      const user = await userService.checkAuth(req.body.oAuthAccessToken);
      cookieService.deleteCookie(res, OAUTH_ACCESS_TOKEN);

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getFavoriteTeams(
    req: Request,
    res: Response<GetFavoriteTeamsResponse>,
    next: NextFunction,
  ) {
    try {
      const favoriteTeams = await userService.getFavoriteTeams(
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
      );

      res.json(favoriteTeams);
    } catch (err) {
      next(err);
    }
  }

  async addFavoriteTeam(
    req: Request<any, any, FavoriteTeamRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.addFavoriteTeam(
        req.body.id,
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
      );

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteFavoriteTeam(
    req: Request<any, any, FavoriteTeamRequest>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.deleteFavoriteTeam(
        req.body.id,
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
      );

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async setUserData(req: Request<any, any, UserData>, res: Response, next: NextFunction) {
    try {
      const user = await userService.findOne({
        oAuthAccessToken: cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
      });

      if (!user) {
        throw ApiError.Unauthorized('User does not exist.');
      }

      const updatedUser = await userService.update(user, req.body);

      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
