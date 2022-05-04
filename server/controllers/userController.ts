import {
  CheckAuthRequest,
  CheckAuthResponse,
  FavoriteTeamRequest,
  GetFavoriteTeamsResponse,
} from './../types/userTypes';
import { Request, Response } from 'express';
import userService from '../services/userService';
import cookieService from '../services/cookieService';
import { OAUTH_ACCESS_TOKEN } from '../constants/twitterConstants';
import ApiError from '../errors/ApiError';

class UserController {
  async checkAuth(req: Request<any, any, CheckAuthRequest>, res: Response<CheckAuthResponse>) {
    const { userName } = await userService.checkAuth(req.body.oAuthAccessToken);

    if (!cookieService.getCookie(req, OAUTH_ACCESS_TOKEN)) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    res.json({ userName });
  }

  async logout(req: Request<any, any, CheckAuthRequest>, res: Response) {
    const user = await userService.checkAuth(req.body.oAuthAccessToken);
    cookieService.deleteCookie(res, OAUTH_ACCESS_TOKEN);

    res.json(user);
  }

  async getFavoriteTeams(req: Request, res: Response<GetFavoriteTeamsResponse>) {
    const favoriteTeams = await userService.getFavoriteTeams(
      cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
    );

    res.json(favoriteTeams);
  }

  async addFavoriteTeam(req: Request<any, any, FavoriteTeamRequest>, res: Response) {
    const user = await userService.addFavoriteTeam(
      req.body.id,
      cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
    );

    res.json(user);
  }

  async deleteFavoriteTeam(req: Request<any, any, FavoriteTeamRequest>, res: Response) {
    const user = await userService.deleteFavoriteTeam(
      req.body.id,
      cookieService.getCookie(req, OAUTH_ACCESS_TOKEN),
    );

    res.json(user);
  }
}

export default new UserController();
