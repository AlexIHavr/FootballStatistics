import { UserSchema } from './../types/userTypes';
import ApiError from '../errors/ApiError';
import userModel from '../models/userModel';
import { TwitterLoginResponse } from '../types/twitterTypes';
import { FilterQuery } from 'mongoose';

class UserService {
  async create({
    userName,
    oAuthAccessTokens: { oAuthAccessToken, oAuthAccessTokenSecret },
  }: TwitterLoginResponse) {
    const newUser = await userModel.create({ userName, oAuthAccessToken, oAuthAccessTokenSecret });

    return newUser;
  }

  async update(user: UserSchema, updatedObj: Partial<UserSchema>) {
    const updatedUser = await user.updateOne(updatedObj);
    return updatedUser;
  }

  async checkAuth(oAuthAccessToken: string) {
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    return user;
  }

  async findOne(filterObj: FilterQuery<UserSchema>) {
    const user = await userModel.findOne(filterObj);
    return user;
  }

  async getFavoriteTeams(oAuthAccessToken: string) {
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    return user.favoriteTeams;
  }

  async addFavoriteTeam(id: number, oAuthAccessToken: string) {
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    user.favoriteTeams.push(id);
    await user.save();

    return user;
  }

  async deleteFavoriteTeam(id: number, oAuthAccessToken: string) {
    const user = await this.findOne({ oAuthAccessToken });

    if (!user) {
      throw ApiError.Unauthorized('Invalid oAuth access token.');
    }

    if (!user.favoriteTeams.find((teamId) => id === teamId)) {
      throw ApiError.BadRequest('Team with request id does not exist.');
    }

    user.favoriteTeams = user.favoriteTeams.filter((teamId) => id !== teamId);
    await user.save();

    return user;
  }
}

export default new UserService();
