import {
  GetTweetsRequest,
  GetTweetsResponse,
  TwitterLoginRequest,
  TwitterLoginResponse,
} from './../types/twitterTypes';
import { Request, Response, NextFunction } from 'express';
import twitterService from '../services/twitterService';
import { OAuthRequestToken } from '../types/twitterTypes';
import cookieService from '../services/cookieService';
import { OAUTH_ACCESS_TOKEN, OAUTH_TOKEN_SECRET } from '../constants/twitterConstants';
import userService from '../services/userService';

class TwitterController {
  async getRequestToken(req: Request, res: Response<OAuthRequestToken>, next: NextFunction) {
    try {
      const oAuthRequestTokens = await twitterService.getRequestToken();

      cookieService.setCookie(res, OAUTH_TOKEN_SECRET, oAuthRequestTokens.oAuthTokenSecret);
      res.json(oAuthRequestTokens);
    } catch (err) {
      next(err);
    }
  }

  async twitterLogin(
    req: Request<any, any, TwitterLoginRequest>,
    res: Response<TwitterLoginResponse>,
    next: NextFunction
  ) {
    try {
      const { oAuthAccessTokens, userName } = await twitterService.getAccessTokenWithUserName({
        ...req.body,
        oAuthTokenSecret: cookieService.getCookie(req, OAUTH_TOKEN_SECRET),
      });

      const user = await userService.findOne({ userName });

      if (user) {
        await userService.update(user, { ...oAuthAccessTokens });
      } else {
        await userService.create({ oAuthAccessTokens, userName });
      }

      cookieService.deleteCookie(res, OAUTH_TOKEN_SECRET);
      cookieService.setCookie(res, OAUTH_ACCESS_TOKEN, oAuthAccessTokens.oAuthAccessToken);
      res.json({ oAuthAccessTokens, userName });
    } catch (err) {
      next(err);
    }
  }

  async getTweets(
    req: Request<any, any, GetTweetsRequest>,
    res: Response<GetTweetsResponse>,
    next: NextFunction
  ) {
    try {
      const data = await twitterService.getTweets(req.body.query);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default new TwitterController();
