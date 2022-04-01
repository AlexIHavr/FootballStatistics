import { configureStore } from '@reduxjs/toolkit';
import twitterReducer from './twitterAuth/reducer';

export const store = configureStore({
  reducer: {
    twitterAuth: twitterReducer,
  },
});

export type storeType = ReturnType<typeof store.getState>;
export type dispatchType = typeof store.dispatch;
