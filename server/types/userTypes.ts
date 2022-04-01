import { Document } from 'mongoose';

export type userSchemaType = {
  userName: string;
  oAuthAccessToken: string;
  oAuthAccessTokenSecret: string;
} & Document;

export type checkAuthRequestType = {
  oAuthAccessToken: string;
};

export type checkAuthResponseType = {
  userName: string;
};
