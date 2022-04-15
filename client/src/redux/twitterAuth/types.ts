export type InitialState = {
  isAuth: boolean;
  userName: string;
  isLoading: boolean;
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
  userName: string;
};

export type CheckAuthResponse = {
  userName: string;
};

export type TwitterLoginQueryString = {
  oauth_token: string;
  oauth_verifier: string;
};
