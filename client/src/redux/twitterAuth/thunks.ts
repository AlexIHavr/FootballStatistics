import { twitterLoginResponseType, checkAuthResponseType } from './types';
import { OAUTH_ACCESS_TOKEN } from './constants';
import { userApi, twitterApi } from '../../api/api';
import { dispatchType } from '../store';
import { setAuthData } from './reducer';

export const twitterLogin =
  (oauth_token: string, oauth_verifier: string) => async (dispatch: dispatchType) => {
    try {
      const response = await twitterApi.post<twitterLoginResponseType>(`/oauth/twitterLogin`, {
        oAuthToken: oauth_token,
        oAuthVerifier: oauth_verifier,
      });

      const {
        oAuthAccessTokens: { oAuthAccessToken },
        userName,
      } = response.data;

      dispatch(setAuthData({ isAuth: true, userName }));
      localStorage.setItem(OAUTH_ACCESS_TOKEN, oAuthAccessToken);
    } catch (err) {
      console.log(err);
    }
  };

export const checkIsAuth = (oAuthAccessToken: string) => async (dispatch: dispatchType) => {
  try {
    const response = await userApi.post<checkAuthResponseType>('/checkAuth', { oAuthAccessToken });
    const { userName } = response.data;

    dispatch(setAuthData({ isAuth: true, userName }));
  } catch (err) {
    console.log(err);
  }
};

export const twitterLogout = (oAuthAccessToken: string) => async (dispatch: dispatchType) => {
  try {
    await userApi.post('/logout', { oAuthAccessToken });
    dispatch(setAuthData({ isAuth: false, userName: '' }));
    localStorage.removeItem(OAUTH_ACCESS_TOKEN);
  } catch (err) {
    console.log(err);
  }
};
