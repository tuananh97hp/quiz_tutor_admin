import { BaseService } from '@/services/BaseService';
import { DetailResultSet, FindResultSet } from '@/types/find-result-set';
import { ITeacher, ITeacherSummary } from '@/types/models';

class TeacherService extends BaseService {
  async fetchDataTeacher(accessToken: string, payload?: object): Promise<FindResultSet<ITeacher>> {
    const result = await this.apiGet('api/teachers', accessToken, payload);
    return result.data;
  }
  async getTeacherDetail(
    accessToken: string,
    teacherId: number,
  ): Promise<DetailResultSet<ITeacher>> {
    const result = await this.apiGet(`api/teachers/${teacherId}`, accessToken);
    return result.data;
  }

  async getTeacherSummary(accessToken: string, payload?: object): Promise<ITeacherSummary> {
    const result = await this.apiGet('api/teachers/summary', accessToken, payload);
    return result.data.data;
  }

  async createTeacher(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/teachers`, accessToken, payload);
    return result.data;
  }

  async updateTeacher(accessToken: string, teacherId: number, payload?: object) {
    const result = await this.apiPut(`api/teachers/${teacherId}`, accessToken, payload);

    return result.data;
  }

  async exportTeacher(accessToken: string, payload?: object) {
    const result = await this.apiGetFile('api/teachers/export-excel', accessToken, payload);

    return result.data;
  }

  async downloadImportTemplate(accessToken: string) {
    const result = await this.apiGetFile('api/teachers/import-excel-template', accessToken);

    return result.data;
  }

  async importTeacher(accessToken: string, payload?: object) {
    const result = await this.apiPostFile('api/teachers/import-excel', accessToken, payload);

    return result.data;
  }

  async updateTeacherStatus(accessToken: string, teacherId: number, payload?: object) {
    const result = await this.apiPut(
      `api/teachers/${teacherId}/update-status`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async deleteTeacher(accessToken: string, teacherId: number) {
    const result = await this.apiDelete(`api/teachers/${teacherId}`, accessToken);

    return result.data;
  }

  async attendanceTeacher(accessToken: string, teacherId: number, payload?: object) {
    const result = await this.apiPost(`api/teachers/${teacherId}/attendance`, accessToken, payload);

    return result.data;
  }

  async fetchAttendanceTeacher(accessToken: string, teacherId: number, payload?: object) {
    const result = await this.apiGet(`api/teachers/${teacherId}/attendance`, accessToken, payload);

    return result.data;
  }

  async fetchDataDashboard(accessToken: string, payload?: object) {
    const result = await this.apiGet(`api/dashboard`, accessToken, payload);

    return result.data;
  }
}

const teacherService = new TeacherService();
export default teacherService;
