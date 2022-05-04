import {
  GetTweetsRequest,
  GetTweetsResponse,
  TwitterLoginRequest,
  TwitterLoginResponse,
} from './../types/twitterTypes';
import { Request, Response } from 'express';
import twitterService from '../services/twitterService';
import { OAuthRequestToken } from '../types/twitterTypes';
import cookieService from '../services/cookieService';
import { OAUTH_ACCESS_TOKEN, OAUTH_TOKEN_SECRET } from '../constants/twitterConstants';
import userService from '../services/userService';

class TwitterController {
  async getRequestToken(req: Request, res: Response<OAuthRequestToken>) {
    const requestToken = await twitterService.getRequestToken();

    cookieService.setCookie(res, OAUTH_TOKEN_SECRET, requestToken.oAuthTokenSecret);
    res.json(requestToken);
  }

  async twitterLogin(
    req: Request<any, any, TwitterLoginRequest>,
    res: Response<TwitterLoginResponse>,
  ) {
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
  }

  async getTweets(req: Request<any, any, GetTweetsRequest>, res: Response<GetTweetsResponse>) {
    const data = await twitterService.getTweets(req.body.query);
    res.json(data);
  }
}

export default new TwitterController();
