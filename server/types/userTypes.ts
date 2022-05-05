import { Document } from 'mongoose';

export type UserData = {
  name: string;
  birthDay?: string;
  email?: string;
};

export type UserSchema = {
  name: string;
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
  email: string;
  favoriteTeams: number[];
  birthDay: string;
} & Document;

export type CheckAuthRequest = {
  oAuthAccessToken: string;
};

export type FavoriteTeamRequest = {
  id: number;
};

export type GetFavoriteTeamsResponse = number[];
