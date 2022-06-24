import { Document } from 'mongoose';

export type UserData = {
  name: string;
  birthDay?: string;
  email?: string;
};

export type UserSchema = {
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
  favoriteTeams: number[];
} & UserData &
  Document;

export type CheckAuthRequest = {
  oAuthAccessToken: string;
};

export type FavoriteTeamRequest = {
  id: number;
};

export type GetFavoriteTeamsResponse = number[];
