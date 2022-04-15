import { Schema, model } from 'mongoose';
import { UserSchema } from '../types/userTypes';

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  oAuthAccessToken: { type: String },
  oAuthAccessTokenSecret: { type: String },
});

export default model<UserSchema>('User', userSchema);
