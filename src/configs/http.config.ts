import axios from 'axios';
import axiosRequestConfig from '@/configs/axios.config';

// Utils
import { HTTP_CODE } from '@/utils/constants/http';
import { STORAGE_KEYS } from '@/utils/constants';
import { getCookie } from '@/utils/cookies';
import { signOut } from 'next-auth/react';

/**
 *  Documents Interceptors: https://axios-http.com/docs/interceptors
 **/

const http = axios.create(axiosRequestConfig);

http.interceptors.request.use(async (config) => {
  const token = getCookie(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers['Authorization'] = 'Bearer' + token;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === HTTP_CODE.UNAUTHORIZED) {
      await signOut({ callbackUrl: '/' });
    } else {
      return Promise.reject(error);
    }
  },
);

export default http;
