import { TwitterTweetsApiResponse, TwitterUsersApiResponse } from './../types/twitterTypes';
import fetch from 'node-fetch';
import ApiError from '../errors/ApiError';
import oAuthRepository from '../repositories/oAuthRepository';
import {
  TwitterLoginRequest,
  OAuthRequestToken,
  TwitterLoginResponse,
} from '../types/twitterTypes';
import { TWITTER_TWEETS_API_URL, TWITTER_USERS_API_URL } from '../constants/twitterConstants';

class TwitterService {
  async getRequestToken() {
    const oAuthRequestTokens: OAuthRequestToken = await new Promise((resolve, reject) => {
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
  }: TwitterLoginRequest) {
    const { oAuthAccessTokens, userName }: TwitterLoginResponse = await new Promise(
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

  async getTweets(query: string) {
    const tweetsResponse = await fetch(TWITTER_TWEETS_API_URL + query, {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    });

    const tweets = (await tweetsResponse.json()) as TwitterTweetsApiResponse;

    const authorIds = tweets.data.map(({ author_id }) => author_id).join(',');

    const usersResponse = await fetch(TWITTER_USERS_API_URL + authorIds, {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    });

    const users = (await usersResponse.json()) as TwitterUsersApiResponse;

    return tweets.data.map((tweet, index) => ({ ...tweet, username: users.data[index].username }));
  }
}

export default new TwitterService();
