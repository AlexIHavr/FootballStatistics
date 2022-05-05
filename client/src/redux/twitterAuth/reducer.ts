import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setTwitterRequestTokenUrl, setUserData } from './thunks';
import { InitialState, UserData } from './types';
import { TWITTER_REQUEST_TOKEN_URL } from './constants';

const initialState: InitialState = {
  isAuth: false,
  userData: {},
  userDataError: null,
  isLoading: false,
  twitterRequestTokenUrl: '',
};

export const twitterAuthSlice = createSlice({
  name: 'twitterAuth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ isAuth: boolean; userData: UserData }>) => {
      state.isAuth = action.payload.isAuth;
      state.userData = action.payload.userData;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [setTwitterRequestTokenUrl.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.twitterRequestTokenUrl = TWITTER_REQUEST_TOKEN_URL + action.payload;
    },
    [setUserData.fulfilled.type]: (state) => {
      state.userDataError = '';
    },
    [setUserData.rejected.type]: (state, action: PayloadAction<string>) => {
      state.userDataError = action.payload;
    },
  },
});

export const { setAuthData, setIsLoading } = twitterAuthSlice.actions;

export default twitterAuthSlice.reducer;
