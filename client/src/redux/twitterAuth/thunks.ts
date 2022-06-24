import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi, twitterApi } from '../../api/api';
import { Dispatch } from '../store';

import {
  TwitterLoginResponse,
  TwitterLoginQueryString,
  OAuthRequestToken,
  UserData,
} from './types';
import { OAUTH_ACCESS_TOKEN } from './constants';
import { setAuthData } from './reducer';

export const twitterLogin = createAsyncThunk<void, TwitterLoginQueryString, { dispatch: Dispatch }>(
  'twitterLogin',
  async ({ oauth_token, oauth_verifier }, { dispatch }) => {
    const response = await twitterApi.post<TwitterLoginResponse>(`/oauth/twitterLogin`, {
      oAuthToken: oauth_token,
      oAuthVerifier: oauth_verifier,
    });

    const {
      oAuthAccessTokens: { oAuthAccessToken },
      userData,
    } = response.data;

    localStorage.setItem(OAUTH_ACCESS_TOKEN, oAuthAccessToken);

    dispatch(setAuthData({ isAuth: true, userData }));
  },
);

export const checkIsAuth = createAsyncThunk<void, string, { dispatch: Dispatch }>(
  'checkIsAuth',
  async (oAuthAccessToken, { dispatch }) => {
    const response = await userApi.post<UserData>('/checkAuth', { oAuthAccessToken });
    const userData = response.data;

    dispatch(setAuthData({ isAuth: true, userData }));
  },
);

export const twitterLogout = createAsyncThunk<void, string, { dispatch: Dispatch }>(
  'twitterLogout',
  async (oAuthAccessToken, { dispatch }) => {
    await userApi.post('/logout', { oAuthAccessToken });
    localStorage.removeItem(OAUTH_ACCESS_TOKEN);

    dispatch(setAuthData({ isAuth: false, userData: {} }));
  },
);

export const setTwitterRequestTokenUrl = createAsyncThunk<string>(
  'setTwitterRequestTokenUrl',
  async () => {
    const response = await twitterApi.post<OAuthRequestToken>(`/oauth/getRequestToken`);

    return response.data.oAuthToken;
  },
);

export const setUserData = createAsyncThunk<void, UserData, { rejectValue: string }>(
  'setUserData',
  async (userData, { rejectWithValue }) => {
    try {
      await userApi.put(`/setUserData`, { ...userData });
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);
