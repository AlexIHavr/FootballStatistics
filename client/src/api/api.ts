import axios, { AxiosInstance } from 'axios';
import config from '../config';
import { store } from '../redux/store';
import { setIsLoading } from '../redux/twitterAuth/reducer';

const setInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    if (!store.getState().twitterAuth.isLoading) store.dispatch(setIsLoading(true));
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      if (store.getState().twitterAuth.isLoading) store.dispatch(setIsLoading(false));
      return config;
    },
    (err) => {
      if (store.getState().twitterAuth.isLoading) store.dispatch(setIsLoading(false));
      throw err;
    }
  );
};

export const twitterApi = axios.create({
  withCredentials: true,
  baseURL: `${config.SERVER_API}/twitter`,
});
setInterceptors(twitterApi);

export const userApi = axios.create({
  withCredentials: true,
  baseURL: `${config.SERVER_API}/user`,
});
setInterceptors(userApi);

export const footballApi = axios.create({
  baseURL: `${config.FOOTBALL_API}`,
  headers: {
    'X-Auth-Token': process.env.REACT_APP_FOOTBALL_API_X_AUTH_TOKEN as string,
  },
});
setInterceptors(footballApi);
