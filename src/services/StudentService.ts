import { BaseService } from '@/services/BaseService';

export class StudentService extends BaseService {
  fetchDataStudent(accessToken: string, payload?: object) {
    return this.apiGet('api/students', accessToken, payload);
  }

  createStudent(accessToken: string, payload?: object) {
    return this.apiPost(`api/students`, accessToken, payload);
  }

  updateStudent(accessToken: string, studentId: number, payload?: object) {
    return this.apiPut(`api/students/${studentId}`, accessToken, payload);
  }

  deleteStudent(accessToken: string, studentId: number) {
    return this.apiDelete(`api/students/${studentId}`, accessToken);
  }

  attendanceStudent(accessToken: string, studentId: number, payload?: object) {
    return this.apiPost(`api/students/${studentId}/attendance`, accessToken, payload);
  }

  fetchAttendanceStudent(accessToken: string, studentId: number, payload?: object) {
    return this.apiGet(`api/students/${studentId}/attendance`, accessToken, payload);
  }

  async fetchDataDashboard(accessToken: string, payload?: object) {
    return this.apiGet(`api/dashboard`, accessToken, payload);
  }
}
