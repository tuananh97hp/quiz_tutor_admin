import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosRequestConfig from '@/configs/axios.config';

// Utils
import { HTTP_CODE } from '@/utils/constants/http';
import { STORAGE_KEYS } from '@/utils/constants';
import { getCookie } from '@/utils/cookies';
import { ROUTES } from '@/router/routes';

/**
 *  Documents Interceptors: https://axios-http.com/docs/interceptors
 **/

const http = axios.create(axiosRequestConfig);

http.interceptors.request.use(async (config) => {
  const token = getCookie(STORAGE_KEYS.CSRF_TOKEN);
  if (token) {
    config.headers['Authorization'] = 'Bearer' + token;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const router = useRouter();
    if (error?.response?.status === HTTP_CODE.UNAUTHORIZED) {
      router.push(ROUTES.LOGIN);
    } else {
      return Promise.reject(error);
    }
  },
);

export default http;
