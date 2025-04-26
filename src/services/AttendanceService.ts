import { BaseService } from '@/services/BaseService';
import { FindResultSet, ListFindResultSet } from '@/types/find-result-set';
import { IAttendance, IAttendanceSummary, IClass, IStudentAttendance } from '@/types/models';

class AttendanceService extends BaseService {
  async fetchDataAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IAttendance>> {
    const result = await this.apiGet(`api/attendances`, accessToken, payload);

    return result.data;
  }

  async getAttendanceSummary(accessToken: string, payload?: object): Promise<IAttendanceSummary> {
    const result = await this.apiGet(`api/attendances/summary`, accessToken, payload);

    return result.data.data;
  }

  async getStudentAttendance(
    accessToken: string,
    classId: number,
    payload?: object,
  ): Promise<ListFindResultSet<IStudentAttendance>> {
    const result = await this.apiGet(`api/attendances/${classId}/student`, accessToken, payload);

    return result.data;
  }

  async getClassesAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<ListFindResultSet<IClass>> {
    const result = await this.apiGet(`api/attendance-class`, accessToken, payload);

    return result.data;
  }

  async updateStudentAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(`api/attendances/${classId}/student`, accessToken, payload);

    return result.data;
  }

  async deleteAttendance(accessToken: string, attendanceId: number) {
    const result = await this.apiDelete(`api/attendances/${attendanceId}`, accessToken);

    return result.data;
  }

  // [START] role student
  async studentMeGetAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IAttendance>> {
    const result = await this.apiGet(`api/student-me/attendances`, accessToken, payload);

    return result.data;
  }

  async studentMeGetAttendanceSummary(
    accessToken: string,
    payload?: object,
  ): Promise<IAttendanceSummary> {
    const result = await this.apiGet(`api/student-me/attendances/summary`, accessToken, payload);

    return result.data.data;
  }

  async studentMeAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPost(
      `api/student-me/attendances/classes/${classId}`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async studentMeGetStudentAttendanceOfClass(
    accessToken: string,
    classId: number,
    payload?: object,
  ): Promise<ListFindResultSet<IStudentAttendance>> {
    const result = await this.apiGet(
      `api/student-me/attendances/classes/${classId}/students`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async studentMeUpdateStudentAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(
      `api/student-me/attendances/classes/${classId}/students`,
      accessToken,
      payload,
    );

    return result.data;
  }

  // [END] role student

  // [START] role teacher
  async teacherMeGetAttendance(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IAttendance>> {
    const result = await this.apiGet(`api/teacher-me/attendances`, accessToken, payload);

    return result.data;
  }

  async teacherMeGetAttendanceSummary(
    accessToken: string,
    payload?: object,
  ): Promise<IAttendanceSummary> {
    const result = await this.apiGet(`api/teacher-me/attendances/summary`, accessToken, payload);

    return result.data.data;
  }

  async teacherMeAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPost(
      `api/teacher-me/attendances/classes/${classId}`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async teacherMeGetStudentAttendanceOfClass(
    accessToken: string,
    classId: number,
    payload?: object,
  ): Promise<ListFindResultSet<IStudentAttendance>> {
    const result = await this.apiGet(
      `api/teacher-me/attendances/classes/${classId}/students`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async teacherMeUpdateStudentAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(
      `api/teacher-me/attendances/classes/${classId}/students`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async teacherMeConfirmStudentAttendance(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPost(
      `api/teacher-me/attendances/classes/${classId}/confirm-students`,
      accessToken,
      payload,
    );

    return result.data;
  }
  // [END] role teacher
}

const attendanceService = new AttendanceService();
export default attendanceService;
