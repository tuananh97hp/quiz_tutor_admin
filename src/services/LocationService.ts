import { BaseService } from '@/services/BaseService';
import { ILocation } from '@/types/models';

class LocationService extends BaseService {
  async fetchDataLocation(accessToken: string): Promise<ILocation> {
    const result = await this.apiGet('/api/location/1', accessToken);
    return result?.data;
  }
}

const locationService = new LocationService();
export default locationService;
