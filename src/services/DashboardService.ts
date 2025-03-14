import { BaseService } from '@/services/BaseService';

export class DashboardService extends BaseService {
  async fetchDashboardData(accessToken: string, payload?: object) {
    return this.apiGet('api/students', accessToken);
  }
}
