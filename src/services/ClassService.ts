import { BaseService } from '@/services/BaseService';
import { DetailResultSet, FindResultSet, ListFindResultSet } from '@/types/find-result-set';
import { IClass, IClassSummary, IStudent } from '@/types/models';

class ClassService extends BaseService {
  async fetchStudentOfClass(
    accessToken: string,
    classId: number,
  ): Promise<ListFindResultSet<IStudent>> {
    const result = await this.apiGet(`api/classes/${classId}/students`, accessToken);

    return result.data;
  }

  async fetchClassesOpening(accessToken: string, payload?: object) {
    const result = await this.apiGet(`api/classes-opening`, accessToken, payload);

    return result.data;
  }

  async getClassSummary(accessToken: string): Promise<IClassSummary> {
    const result = await this.apiGet('api/classes/summary', accessToken);

    return result.data.data;
  }

  async assignStudentToClass(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPost(`api/classes/${classId}/students`, accessToken, payload);

    return result.data;
  }

  async fetchDataClass(accessToken: string, payload?: object): Promise<FindResultSet<IClass>> {
    const result = await this.apiGet('api/classes', accessToken, payload);

    return result.data;
  }

  async getClassDetail(accessToken: string, ClassId: number): Promise<DetailResultSet<IClass>> {
    const result = await this.apiGet(`api/classes/${ClassId}`, accessToken);
    return result.data;
  }

  async exportClass(accessToken: string, payload?: object) {
    const result = await this.apiGetFile('api/classes/export-excel', accessToken, payload);

    return result.data;
  }

  async downloadImportTemplate(accessToken: string) {
    const result = await this.apiGetFile('api/classes/import-excel-template', accessToken);

    return result.data;
  }

  async importClass(accessToken: string, payload?: object) {
    const result = await this.apiPostFile('api/classes/import-excel', accessToken, payload);

    return result.data;
  }

  async createClass(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/classes`, accessToken, payload);

    return result.data;
  }

  async updateClass(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(`api/classes/${classId}`, accessToken, payload);

    return result.data;
  }

  async updateStatus(accessToken: string, classId: number, payload?: object) {
    const result = await this.apiPut(`api/classes/${classId}/update-status`, accessToken, payload);

    return result.data;
  }

  async deleteClass(accessToken: string, classId: number) {
    const result = await this.apiDelete(`api/classes/${classId}`, accessToken);

    return result.data;
  }
  // [START] role student
  async studentMeGetClassesToday(
    accessToken: string,
    payload?: object,
  ): Promise<ListFindResultSet<IClass>> {
    const result = await this.apiGet(`api/student-me/classes-today`, accessToken, payload);

    return result.data;
  }
  async studentMeGetClassDetail(
    accessToken: string,
    classId: number,
  ): Promise<DetailResultSet<IClass>> {
    const result = await this.apiGet(`api/student-me/classes/${classId}`, accessToken);

    return result.data;
  }
  async studentMeGetClasses(accessToken: string, payload?: object): Promise<FindResultSet<IClass>> {
    const result = await this.apiGet(`api/student-me/classes`, accessToken, payload);

    return result.data;
  }
  async studentMeGetClassesSummary(accessToken: string, payload?: object): Promise<IClassSummary> {
    const result = await this.apiGet(`api/student-me/classes/summary`, accessToken, payload);

    return result.data.data;
  }
  // [END] role student

  // [START] role teacher
  async teacherMeGetClassesToday(
    accessToken: string,
    payload?: object,
  ): Promise<ListFindResultSet<IClass>> {
    const result = await this.apiGet(`api/teacher-me/classes-today`, accessToken, payload);

    return result.data;
  }
  async teacherMeGetClassDetail(
    accessToken: string,
    classId: number,
  ): Promise<DetailResultSet<IClass>> {
    const result = await this.apiGet(`api/teacher-me/classes/${classId}`, accessToken);

    return result.data;
  }
  async teacherMeGetClasses(accessToken: string, payload?: object): Promise<FindResultSet<IClass>> {
    const result = await this.apiGet(`api/teacher-me/classes`, accessToken, payload);

    return result.data;
  }
  async teacherMeGetClassesSummary(accessToken: string, payload?: object): Promise<IClassSummary> {
    const result = await this.apiGet(`api/teacher-me/classes/summary`, accessToken, payload);

    return result.data.data;
  }
  // [END] role teacher
}

const classService = new ClassService();
export default classService;
