import { BaseService } from '@/services/BaseService';

export class AttendanceService extends BaseService {
  getStudentAttendance(accessToken: string, payload?: object) {
    return this.apiGet('api/attendance-student', accessToken, payload);
  }
  updateStudentAttendance(accessToken: string, payload?: object) {
    return this.apiPut('api/attendance-student', accessToken, payload);
  }

  deleteAttendance(accessToken: string, attendanceId: number) {
    return this.apiDelete(`api/attendances/${attendanceId}`, accessToken);
  }
}
