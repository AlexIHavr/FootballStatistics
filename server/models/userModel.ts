import { Schema, model } from 'mongoose';
import { UserSchema } from '../types/userTypes';

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  favoriteTeams: { type: [Number] },
  birthDay: { type: String },
  oAuthAccessToken: { type: String },
  oAuthAccessTokenSecret: { type: String },
});

export default model<UserSchema>('User', userSchema);
