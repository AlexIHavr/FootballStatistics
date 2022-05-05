import { Document } from 'mongoose';

export type UserSchema = {
  userName: string;
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
  email: string;
  favoriteTeams: number[];
  birthDay: string;
} & Document;

export type CheckAuthRequest = {
  oAuthAccessToken: string;
};

export type CheckAuthResponse = {
  userName: string;
};

export type FavoriteTeamRequest = {
  id: number;
};

export type GetFavoriteTeamsResponse = number[];
