import ApiError from '../errors/ApiError';
import oAuthRepository from '../repositories/oAuthRepository';
import {
  twitterLoginRequestType,
  oAuthRequestTokenType,
  twitterLoginResponseType,
} from '../types/twitterTypes';

class TwitterService {
  async getRequestToken() {
    const oAuthRequestTokens: oAuthRequestTokenType = await new Promise((resolve, reject) => {
      oAuthRepository.oAuth.getOAuthRequestToken((err, oAuthToken, oAuthTokenSecret) => {
        if (err) {
          reject(ApiError.oAuthError(err.statusCode, err.data));
        } else {
          resolve({ oAuthToken, oAuthTokenSecret });
        }
      });
    });

    return oAuthRequestTokens;
  }

  async getAccessTokenWithUserName({
    oAuthToken,
    oAuthTokenSecret,
    oAuthVerifier,
  }: twitterLoginRequestType) {
    const { oAuthAccessTokens, userName }: twitterLoginResponseType = await new Promise(
      (resolve, reject) => {
        oAuthRepository.oAuth.getOAuthAccessToken(
          oAuthToken,
          oAuthTokenSecret,
          oAuthVerifier,
          (err, oAuthAccessToken, oAuthAccessTokenSecret, results) => {
            if (err) {
              reject(ApiError.oAuthError(err.statusCode, err.data));
            } else {
              resolve({
                oAuthAccessTokens: { oAuthAccessToken, oAuthAccessTokenSecret },
                userName: results.screen_name,
              });
            }
          }
        );
      }
    );

    return { oAuthAccessTokens, userName };
  }
}

export default new TwitterService();
