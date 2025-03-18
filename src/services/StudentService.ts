import { BaseService } from '@/services/BaseService';
import { FindResultSet } from '@/types/find-result-set';
import { IStudent } from '@/types/models';

class StudentService extends BaseService {
  async fetchDataStudent(accessToken: string, payload?: object): Promise<FindResultSet<IStudent>> {
    const result = await this.apiGet('api/workspaces/1/students', accessToken, payload);

    return result.data;
  }

  async createStudent(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/workspaces/1/students`, accessToken, payload);

    return result.data;
  }

  async updateStudent(accessToken: string, studentId: number, payload?: object) {
    const result = await this.apiPut(
      `api/workspaces/1/students/${studentId}`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async deleteStudent(accessToken: string, studentId: number) {
    const result = await this.apiDelete(`api/workspaces/1/students/${studentId}`, accessToken);

    return result.data;
  }

  async attendanceStudent(accessToken: string, studentId: number, payload?: object) {
    const result = await this.apiPost(
      `api/workspaces/1/students/${studentId}/attendance`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async fetchAttendanceStudent(accessToken: string, studentId: number, payload?: object) {
    const result = await this.apiGet(
      `api/workspaces/1/students/${studentId}/attendance`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async fetchDataDashboard(accessToken: string, payload?: object) {
    const result = await this.apiGet(`api/workspaces/1/dashboard`, accessToken, payload);

    return result.data;
  }
}

const studentService = new StudentService();
export default studentService;
