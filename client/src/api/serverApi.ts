import axios, { AxiosInstance } from 'axios';
import config from '../config';
import { store } from '../redux/store';
import { setIsLoading } from '../redux/twitterAuth/reducer';

const setInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use((config) => {
    store.dispatch(setIsLoading(true));
    return config;
  });

  api.interceptors.response.use(
    (config) => {
      store.dispatch(setIsLoading(false));
      return config;
    },
    (err) => {
      store.dispatch(setIsLoading(false));
      throw err;
    }
  );
};

export const twitterApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/twitter`,
});
setInterceptors(twitterApi);

export const userApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/user`,
});
setInterceptors(userApi);
