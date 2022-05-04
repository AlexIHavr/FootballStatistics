import { OAuth } from 'oauth';

class OAuthRepository {
  oAuth: OAuth;
  init() {
    const CUSTOMER_KEY = process.env.CUSTOMER_KEY ?? '';
    const CUSTOMER_SECRET = process.env.CUSTOMER_SECRET ?? '';
    this.oAuth = new OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      CUSTOMER_KEY,
      CUSTOMER_SECRET,
      '1.0',
      process.env.CLIENT_URL as string,
      'HMAC-SHA1',
    );
  }
}

export default new OAuthRepository();
