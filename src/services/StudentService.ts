import { BaseService } from '@/services/BaseService';
import { DetailResultSet, FindResultSet } from '@/types/find-result-set';
import { IStudent, IStudentSummary } from '@/types/models';

class StudentService extends BaseService {
  async fetchDataStudent(accessToken: string, payload?: object): Promise<FindResultSet<IStudent>> {
    const result = await this.apiGet('api/workspaces/1/students', accessToken, payload);
    return result.data;
  }
  async getStudentDetail(
    accessToken: string,
    studentId: number,
  ): Promise<DetailResultSet<IStudent>> {
    const result = await this.apiGet(`api/workspaces/1/students/${studentId}`, accessToken);
    return result.data;
  }

  async getStudentSummary(accessToken: string, payload?: object): Promise<IStudentSummary> {
    const result = await this.apiGet('api/workspaces/1/students/summary', accessToken, payload);
    return result.data.data;
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

  async updateStudentStatus(accessToken: string, studentId: number, payload?: object) {
    const result = await this.apiPut(
      `api/workspaces/1/students/${studentId}/update-status`,
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
