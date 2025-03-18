import { BaseService } from '@/services/BaseService';
import { FindResultSet } from '@/types/find-result-set';
import { IClass, IStudent } from '@/types/models';

class ClassService extends BaseService {
  async fetchStudentOfClass(accessToken: string, classId: number) {
    const result = await this.apiGet(`api/workspaces/1/classes/${classId}/students`, accessToken);

    return result.data;
  }

  async fetchClassesOpening(accessToken: string, payload?: object) {
    const result = await this.apiGet(`api/workspaces/1/classes-opening`, accessToken, payload);

    return result.data;
  }

  async assignStudentToClass(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPost(
      `api/workspaces/1/classes/${classId}/students`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async fetchDataClass(accessToken: string, payload?: object): Promise<FindResultSet<IClass>> {
    const result = await this.apiGet('api/workspaces/1/classes', accessToken, payload);

    return result.data;
  }

  async createClass(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/workspaces/1/classes`, accessToken, payload);

    return result.data;
  }

  async updateClass(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(`api/workspaces/1/classes/${classId}`, accessToken, payload);

    return result.data;
  }

  async deleteClass(accessToken: string, classId: number) {
    const result = await this.apiDelete(`api/workspaces/1/classes/${classId}`, accessToken);

    return result.data;
  }
}

const classService = new ClassService();
export default classService;
