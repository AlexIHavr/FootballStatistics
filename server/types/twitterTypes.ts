export type twitterLoginRequestType = {
  oAuthVerifier: string;
} & oAuthRequestTokenType;

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
