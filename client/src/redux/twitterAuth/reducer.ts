import { setTwitterRequestTokenUrl } from './thunks';
import { InitialState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWITTER_REQUEST_TOKEN_URL } from './constants';

const initialState: InitialState = {
  isAuth: false,
  userName: '',
  isLoading: false,
  twitterRequestTokenUrl: '',
};

export const twitterAuthSlice = createSlice({
  name: 'twitterAuth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ isAuth: boolean; userName: string }>) => {
      state.isAuth = action.payload.isAuth;
      state.userName = action.payload.userName;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [setTwitterRequestTokenUrl.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.twitterRequestTokenUrl = TWITTER_REQUEST_TOKEN_URL + action.payload;
    },
  },
});

export const { setAuthData, setIsLoading } = twitterAuthSlice.actions;

export default twitterAuthSlice.reducer;
