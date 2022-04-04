import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type twitterAuthState = {
  isAuth: boolean;
  userName: string;
  isLoading: boolean;
};

const initialState: twitterAuthState = {
  isAuth: false,
  userName: '',
  isLoading: false,
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
});

export const { setAuthData, setIsLoading } = twitterAuthSlice.actions;

export default twitterAuthSlice.reducer;
