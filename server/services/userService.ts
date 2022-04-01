import { userSchemaType } from './../types/userTypes';
import ApiError from '../errors/ApiError';
import userModel from '../models/userModel';
import { twitterLoginResponseType } from '../types/twitterTypes';

class UserService {
  async create({
    userName,
    oAuthAccessTokens: { oAuthAccessToken, oAuthAccessTokenSecret },
  }: twitterLoginResponseType) {
    const newUser = await userModel.create({ userName, oAuthAccessToken, oAuthAccessTokenSecret });

    return newUser;
  }

  async update(user: userSchemaType, updatedObj: Partial<userSchemaType>) {
    const updatedUser = await user.updateOne(updatedObj);
    return updatedUser;
  }

  async checkAuth(oAuthAccessToken: string) {
    const user = await this.get(oAuthAccessToken);

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    } else {
      return user;
    }
  }

  async logout(oAuthAccessToken: string) {
    const user = await this.get(oAuthAccessToken);

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    } else {
      user.oAuthAccessToken = '';
      user.oAuthAccessTokenSecret = '';
      await user.save();
      return user;
    }
  }

  async get(oAuthAccessToken: string) {
    const user = await userModel.findOne({ oAuthAccessToken });
    return user;
  }

  async getById(id: string) {
    const user = await userModel.findById(id);
    return user;
  }
}

export default new UserService();
