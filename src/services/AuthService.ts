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

  async fetchDataProfile(accessToken: string) {
    const result = await this.apiGet('api/user', accessToken);

    return result.data;
  }

  async refreshToken(accessToken: string) {
    const result = await this.apiPost('api/refresh', accessToken);

    return result.data;
  }

  async changePassword(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/change-password`, accessToken, payload);

    return result.data;
  }
}

const authService = new AuthService();
export default authService;
