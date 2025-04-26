import { BaseService } from '@/services/BaseService';
import { DetailResultSet, FindResultSet } from '@/types/find-result-set';
import { IReferrer, IReferrerSummary } from '@/types/models';

class ReferrerService extends BaseService {
  async fetchDataReferrer(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IReferrer>> {
    const result = await this.apiGet('api/referrers', accessToken, payload);
    return result.data;
  }
  async getReferrerDetail(
    accessToken: string,
    referrerId: number,
  ): Promise<DetailResultSet<IReferrer>> {
    const result = await this.apiGet(`api/referrers/${referrerId}`, accessToken);
    return result.data;
  }

  async getReferrerSummary(accessToken: string, payload?: object): Promise<IReferrerSummary> {
    const result = await this.apiGet('api/referrers/summary', accessToken, payload);
    return result.data.data;
  }

  async createReferrer(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/referrers`, accessToken, payload);
    return result.data;
  }

  async updateReferrer(accessToken: string, referrerId: number, payload?: object) {
    const result = await this.apiPut(`api/referrers/${referrerId}`, accessToken, payload);

    return result.data;
  }

  async exportReferrer(accessToken: string, payload?: object) {
    const result = await this.apiGetFile('api/referrers/export-excel', accessToken, payload);

    return result.data;
  }

  async downloadImportTemplate(accessToken: string) {
    const result = await this.apiGetFile('api/referrers/import-excel-template', accessToken);

    return result.data;
  }

  async importReferrer(accessToken: string, payload?: object) {
    const result = await this.apiPostFile('api/referrers/import-excel', accessToken, payload);

    return result.data;
  }

  async updateReferrerStatus(accessToken: string, referrerId: number, payload?: object) {
    const result = await this.apiPut(
      `api/referrers/${referrerId}/update-status`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async deleteReferrer(accessToken: string, referrerId: number) {
    const result = await this.apiDelete(`api/referrers/${referrerId}`, accessToken);

    return result.data;
  }

  async attendanceReferrer(accessToken: string, referrerId: number, payload?: object) {
    const result = await this.apiPost(
      `api/referrers/${referrerId}/attendance`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async fetchAttendanceReferrer(accessToken: string, referrerId: number, payload?: object) {
    const result = await this.apiGet(
      `api/referrers/${referrerId}/attendance`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async fetchDataDashboard(accessToken: string, payload?: object) {
    const result = await this.apiGet(`api/dashboard`, accessToken, payload);

    return result.data;
  }
}

const referrerService = new ReferrerService();
export default referrerService;
