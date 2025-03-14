import { BaseService } from '@/services/BaseService';

export class ClassService extends BaseService {
  fetchStudentOfClass(accessToken: string, classId: number) {
    return this.apiGet(`api/classes/${classId}/students`, accessToken);
  }

  fetchClassesOpening(accessToken: string, payload?: object) {
    return this.apiGet(`api/classes-opening`, accessToken, payload);
  }

  assignStudentToClass(accessToken: string, classId: number, payload?: object) {
    return this.apiPost(`api/classes/${classId}/students`, accessToken, payload);
  }

  fetchDataClass(accessToken: string, payload?: object) {
    return this.apiGet('api/classes', accessToken, payload);
  }

  createClass(accessToken: string, payload?: object) {
    return this.apiPost(`api/classes`, accessToken, payload);
  }

  updateClass(accessToken: string, classId: number, payload?: object) {
    return this.apiPut(`api/classes/${classId}`, accessToken, payload);
  }

  deleteClass(accessToken: string, classId: number) {
    return this.apiDelete(`api/classes/${classId}`, accessToken);
  }
}
