import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type twitterAuthState = {
  isAuth: boolean;
  userName: string;
};

const initialState: twitterAuthState = {
  isAuth: false,
  userName: '',
};

export const twitterAuthSlice = createSlice({
  name: 'twitterAuth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<{ isAuth: boolean; userName: string }>) => {
      state.isAuth = action.payload.isAuth;
      state.userName = action.payload.userName;
    },
  },
});

export const { setAuthData } = twitterAuthSlice.actions;

export default twitterAuthSlice.reducer;
