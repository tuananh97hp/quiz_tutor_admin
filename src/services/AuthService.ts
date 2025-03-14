// Http
import http from '@/configs/http.config';

// Types
import { LoginRequest } from '@/types/AuthType';

// Utils
import { BaseService } from '@/services/BaseService';

const ENDPOINTS = {
  API_LOGIN: '/api/login',
};

class AuthService extends BaseService {
  async login(payload?: LoginRequest) {
    const result = await http.post(ENDPOINTS.API_LOGIN, payload);
    return result.data;
  }

  async signOut(accessToken: string) {
    return await this.apiPost('api/logout', accessToken);
  }

  fetchDataProfile(accessToken: string) {
    return this.apiGet('api/user', accessToken);
  }

  refreshToken(accessToken: string) {
    return this.apiPost('api/refresh', accessToken);
  }

  changePassword(accessToken: string, payload?: object) {
    return this.apiPost(`api/change-password`, accessToken, payload);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
