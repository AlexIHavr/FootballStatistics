import { Document } from 'mongoose';

export type UserSchema = {
  userName: string;
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
} & Document;

export type CheckAuthRequest = {
  oAuthAccessToken: string;
};

export type CheckAuthResponse = {
  userName: string;
};
