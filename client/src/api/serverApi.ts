import axios from 'axios';
import config from '../config';

export const twitterApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/twitter`,
});

export const userApi = axios.create({
  withCredentials: true,
  baseURL: `${config.API_URL}/user`,
});
