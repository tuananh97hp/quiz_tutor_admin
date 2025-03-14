import { HttpResponseStatuses } from '@/domain/constants'
import { ILocation } from '@/models/ILocation'
import { Repository } from '@/repositories/Repository'

export interface ILocationRepository {
  fetchDataLocation(): Promise<ILocation>
}

export class LocationRepository extends Repository implements ILocationRepository {
  async fetchDataLocation(): Promise<ILocation> {
    const result = await this.apiGet('/api/location/1')

    if (result?.status !== HttpResponseStatuses.ok) {
      throw new Error('failed-response')
    }
    return result?.data
  }
}
