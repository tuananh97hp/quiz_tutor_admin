import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export class StudentRepository extends Repository {
  fetchDataStudent(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet('api/students', config)
  }

  createStudent(accessToken: string, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/students`, payload, config)
  }

  updateStudent(accessToken: string, studentId: number, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPut(`api/students/${studentId}`, payload, config)
  }

  deleteStudent(accessToken: string, studentId: number): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiDelete(`api/students/${studentId}`, config)
  }

  attendanceStudent(accessToken: string, studentId: number, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/students/${studentId}/attendance`, payload, config)
  }

  fetchAttendanceStudent(accessToken: string, studentId: number, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet(`api/students/${studentId}/attendance`, config)
  }

  async fetchDataDashboard(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet(`api/dashboard`, config)
  }
}
