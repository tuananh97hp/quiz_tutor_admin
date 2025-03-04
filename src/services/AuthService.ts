// Http
import http from '@/configs/http.config';

// Types
import { LoginRequest } from '@/types/AuthType';

// Utils
import { deleteCookie } from '@/utils/cookies';
import { STORAGE_KEYS } from '@/utils/constants';

const ENDPOINTS = {
  API_LOGIN: '/api/login',
};

class AuthService {
  async login(payload: LoginRequest) {
    const result = await http.post(ENDPOINTS.API_LOGIN, payload);
    return result.data;
  }

  logout() {
    deleteCookie(STORAGE_KEYS.CSRF_TOKEN);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
