import { BaseService } from '@/services/BaseService';
import { ListFindResultSet } from '@/types/find-result-set';
import { IClass, IStudentAttendance } from '@/types/models';

class AttendanceService extends BaseService {
  async getStudentAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<ListFindResultSet<IStudentAttendance>> {
    const result = await this.apiGet('api/workspaces/1/attendance-student', accessToken, payload);

    return result.data;
  }

  async getClassesAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<ListFindResultSet<IClass>> {
    const result = await this.apiGet(`api/workspaces/1/attendance-class`, accessToken, payload);

    return result.data;
  }

  async updateStudentAttendance(accessToken: string, payload?: object) {
    const result = await this.apiPut('api/workspaces/1/attendance-student', accessToken, payload);

    return result.data;
  }

  async deleteAttendance(accessToken: string, attendanceId: number) {
    const result = await this.apiDelete(
      `api/workspaces/1/attendances/${attendanceId}`,
      accessToken,
    );

    return result.data;
  }
}

const attendanceService = new AttendanceService();
export default attendanceService;
