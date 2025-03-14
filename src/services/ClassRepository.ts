import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export class ClassRepository extends Repository {
  fetchStudentOfClass(accessToken: string, classId: number): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiGet(`api/classes/${classId}/students`, config)
  }

  fetchClassesOpening(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet(`api/classes-opening`, config)
  }

  assignStudentToClass(accessToken: string, classId: number, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/classes/${classId}/students`, payload, config)
  }

  fetchDataClass(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet('api/classes', config)
  }

  createClass(accessToken: string, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/classes`, payload, config)
  }

  updateClass(accessToken: string, classId: number, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPut(`api/classes/${classId}`, payload, config)
  }

  deleteClass(accessToken: string, classId: number): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiDelete(`api/classes/${classId}`, config)
  }
}
