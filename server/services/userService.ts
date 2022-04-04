import { userSchemaType } from './../types/userTypes';
import ApiError from '../errors/ApiError';
import userModel from '../models/userModel';
import { twitterLoginResponseType } from '../types/twitterTypes';
import { FilterQuery } from 'mongoose';

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
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    } else {
      return user;
    }
  }

  async logout(oAuthAccessToken: string) {
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    return user;
  }

  async findOne(filterObj: FilterQuery<userSchemaType>) {
    const user = await userModel.findOne(filterObj);
    return user;
  }
}

export default new UserService();
