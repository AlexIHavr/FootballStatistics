export type TwitterLoginRequest = {
  oAuthVerifier: string;
} & OAuthRequestToken;

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

export type GetTweetsRequest = {
  query: string;
};

export type GetTweetsResponse = {
  username: string;
  created_at: string;
  id: string;
  text: string;
  author_id: string;
}[];

export type TwitterTweetsApiResponse = {
  data: {
    created_at: string;
    id: string;
    text: string;
    author_id: string;
  }[];
};

export type TwitterUsersApiResponse = {
  data: {
    id: string;
    name: string;
    username: string;
  }[];
};
