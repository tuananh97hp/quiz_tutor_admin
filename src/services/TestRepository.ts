import { Repository } from '@/repositories/Repository';
import { Itest } from '@/models/Itest';

export interface ITestRepository {
  fetchDataTest(): Promise<Itest>;
}

export class TestRepository extends Repository implements ITestRepository {
  async fetchDataTest(): Promise<Itest> {
    const result = await this.apiGet('/api/hello');

    return result?.data;
  }
}
