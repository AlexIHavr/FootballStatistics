import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TwitterLoginResponse,
  CheckAuthResponse,
  TwitterLoginQueryString,
  OAuthRequestToken,
} from './types';
import { OAUTH_ACCESS_TOKEN } from './constants';
import { userApi, twitterApi } from '../../api/api';
import { setAuthData } from './reducer';
import { Dispatch } from '../store';

export const twitterLogin = createAsyncThunk<void, TwitterLoginQueryString, { dispatch: Dispatch }>(
  'twitterLogin',
  async ({ oauth_token, oauth_verifier }, { dispatch }) => {
    const response = await twitterApi.post<TwitterLoginResponse>(`/oauth/twitterLogin`, {
      oAuthToken: oauth_token,
      oAuthVerifier: oauth_verifier,
    });

    const {
      oAuthAccessTokens: { oAuthAccessToken },
      userName,
    } = response.data;

    localStorage.setItem(OAUTH_ACCESS_TOKEN, oAuthAccessToken);

    dispatch(setAuthData({ isAuth: true, userName }));
  }
);

export const checkIsAuth = createAsyncThunk<void, string, { dispatch: Dispatch }>(
  'checkIsAuth',
  async (oAuthAccessToken, { dispatch }) => {
    const response = await userApi.post<CheckAuthResponse>('/checkAuth', { oAuthAccessToken });
    const { userName } = response.data;

    dispatch(setAuthData({ isAuth: true, userName }));
  }
);

export const twitterLogout = createAsyncThunk<void, string, { dispatch: Dispatch }>(
  'twitterLogout',
  async (oAuthAccessToken, { dispatch }) => {
    await userApi.post('/logout', { oAuthAccessToken });
    localStorage.removeItem(OAUTH_ACCESS_TOKEN);

    dispatch(setAuthData({ isAuth: false, userName: '' }));
  }
);

export const setTwitterRequestTokenUrl = createAsyncThunk<string>(
  'setTwitterRequestTokenUrl',
  async () => {
    const response = await twitterApi.post<OAuthRequestToken>(`/oauth/getRequestToken`);

    return response.data.oAuthToken;
  }
);
