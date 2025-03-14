import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export class AttendanceRepository extends Repository {
  getStudentAttendance(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet('api/attendance-student', config)
  }
  updateStudentAttendance(accessToken: string, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPut('api/attendance-student', payload, config)
  }

  deleteAttendance(accessToken: string, attendanceId: number): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiDelete(`api/attendances/${attendanceId}`, config)
  }
}
