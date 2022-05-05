import { Response, Request } from 'express';
import { TIME_OAUTH } from '../constants/twitterConstants';

class CookieService {
  getCookie(req: Request, name: string): string {
    return req.cookies[name];
  }

  setCookie(res: Response, name: string, value: string) {
    res.cookie(name, value, {
      maxAge: TIME_OAUTH,
      httpOnly: true,
    });
  }

  deleteCookie(res: Response, name: string) {
    res.cookie(name, {}, { maxAge: -1 });
  }
}

export default new CookieService();
