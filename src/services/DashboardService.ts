import { BaseService } from '@/services/BaseService';

class DashboardService extends BaseService {
  async fetchDashboardData(accessToken: string, payload?: object) {
    const result = await this.apiGet('api/students', accessToken);

    return result.data;
  }
}

const dashboardService = new DashboardService();

export default dashboardService;
