import { USER_DATA } from './constants';

export type UserData = Partial<Record<keyof typeof USER_DATA, string>>;

export type InitialState = {
  isAuth: boolean;
  userData: UserData;
  isLoading: boolean;
  userDataError: string | null;
  twitterRequestTokenUrl: string;
};

export type OAuthRequestToken = {
  oAuthToken: string;
  oAuthTokenSecret: string;
};

export type TwitterLoginResponse = {
  oAuthAccessTokens: {
    oAuthAccessToken: string;
    oAuthAccessTokenSecret: string;
  };
  userData: UserData;
};

export type TwitterLoginQueryString = {
  oauth_token: string;
  oauth_verifier: string;
};
