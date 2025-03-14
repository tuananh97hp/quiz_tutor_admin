import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/types/models';

export class LocationService extends BaseService {
  async fetchDataLocation(accessToken: string): Promise<ILocation> {
    const result = await this.apiGet('/api/location/1', accessToken);
    return result?.data;
  }
}
