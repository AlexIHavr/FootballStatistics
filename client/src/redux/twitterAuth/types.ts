export type initialStateType = {
  isAuth: boolean;
  userName: string;
  isLoading: boolean;
};

export type oAuthRequestTokenType = {
  oAuthToken: string;
  oAuthTokenSecret: string;
};

export type twitterLoginResponseType = {
  oAuthAccessTokens: {
    oAuthAccessToken: string;
    oAuthAccessTokenSecret: string;
  };
  userName: string;
};

export type checkAuthResponseType = {
  userName: string;
};
