import { BaseService } from '@/services/BaseService';
import { ITest } from '@/types/models';

export class TestService extends BaseService {
  async fetchDataTest(accessToken: string): Promise<ITest> {
    const result = await this.apiGet('/api/hello', accessToken);

    return result?.data;
  }
}
