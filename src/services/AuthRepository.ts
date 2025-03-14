import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export interface IAuthRepository {
  signIn(payload?: object): Promise<IResultApiData>
  signOut(accessToken: string): Promise<IResultApiData>
  fetchDataProfile(accessToken: string): Promise<IResultApiData>
  refreshToken(accessToken: string): Promise<IResultApiData>
}

export class AuthRepository extends Repository implements IAuthRepository {
  signIn(payload?: object): Promise<IResultApiData> {
    return this.apiPost('api/login', payload)
  }

  async signOut(accessToken: string): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return await this.apiPost('api/logout', {}, config)
  }

  fetchDataProfile(accessToken: string): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiGet('api/user', config)
  }

  refreshToken(accessToken: string): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost('api/refresh', config)
  }

  changePassword(accessToken: string, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/change-password`, payload, config)
  }
}
