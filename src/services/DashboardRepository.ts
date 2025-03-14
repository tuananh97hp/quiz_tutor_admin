import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export interface IDashboardRepository {
  fetchDashboardData(accessToken: string, payload?: object): Promise<IResultApiData>
}

export class DashboardRepository extends Repository implements IDashboardRepository {
  async fetchDashboardData(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet('api/students', config)
  }
}
