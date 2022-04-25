import {
  CheckAuthRequest,
  CheckAuthResponse,
  FavoriteTeamRequest,
  GetFavoriteTeamsResponse,
} from './../types/userTypes';
import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import cookieService from '../services/cookieService';
import { OAUTH_ACCESS_TOKEN } from '../constants/twitterConstants';
import ApiError from '../errors/ApiError';

class UserController {
  async checkAuth(
    req: Request<{}, {}, CheckAuthRequest>,
    res: Response<CheckAuthResponse>,
    next: NextFunction
  ) {
    try {
      const { userName } = await userService.checkAuth(req.body.oAuthAccessToken);

      if (!cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)) {
        throw ApiError.Unauthorized('Invalid oAuth access token.');
      }

      res.json({ userName });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request<{}, {}, CheckAuthRequest>, res: Response, next: NextFunction) {
    try {
      const user = await userService.logout(req.body.oAuthAccessToken);
      cookieService.deleteCookie(res, OAUTH_ACCESS_TOKEN);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async getFavoriteTeams(
    req: Request,
    res: Response<GetFavoriteTeamsResponse>,
    next: NextFunction
  ) {
    try {
      const favoriteTeams = await userService.getFavoriteTeams(
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)
      );

      res.json(favoriteTeams);
    } catch (err) {
      next(err);
    }
  }

  async addFavoriteTeam(
    req: Request<{}, {}, FavoriteTeamRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await userService.addFavoriteTeam(
        req.body.id,
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)
      );

      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async deleteFavoriteTeam(
    req: Request<{}, {}, FavoriteTeamRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await userService.deleteFavoriteTeam(
        req.body.id,
        cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)
      );

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
