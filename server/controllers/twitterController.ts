import { twitterLoginRequestType, twitterLoginResponseType } from './../types/twitterTypes';
import { Request, Response, NextFunction } from 'express';
import twitterService from '../services/twitterService';
import { oAuthRequestTokenType } from '../types/twitterTypes';
import cookieService from '../services/cookieService';
import { OAUTH_TOKEN_SECRET } from '../constants/twitterConstants';
import userService from '../services/userService';

class TwitterController {
  async getRequestToken(req: Request, res: Response<oAuthRequestTokenType>, next: NextFunction) {
    try {
      const oAuthRequestTokens = await twitterService.getRequestToken();

      cookieService.setCookie(res, OAUTH_TOKEN_SECRET, oAuthRequestTokens.oAuthTokenSecret);
      res.json(oAuthRequestTokens);
    } catch (err) {
      next(err);
    }
  }

  async twitterLogin(
    req: Request<{}, {}, twitterLoginRequestType>,
    res: Response<twitterLoginResponseType>,
    next: NextFunction
  ) {
    try {
      const { oAuthAccessTokens, userName } = await twitterService.getAccessTokenWithUserName({
        ...req.body,
        oAuthTokenSecret: cookieService.getCookie(req, OAUTH_TOKEN_SECRET),
      });

      const user = await userService.getById(cookieService.getCookie(req, 'userId'));

      if (user) {
        await userService.update(user, { ...oAuthAccessTokens, userName });
      } else {
        const newUser = await userService.create({ oAuthAccessTokens, userName });
        cookieService.setCookie(res, 'userId', newUser._id);
      }

      cookieService.deleteCookie(res, OAUTH_TOKEN_SECRET);
      res.json({ oAuthAccessTokens, userName });
    } catch (err) {
      next(err);
    }
  }
}

export default new TwitterController();
