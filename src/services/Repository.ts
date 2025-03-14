/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { ApiDomain } from '@/domain/constants'

export const repository = axios.create({
  headers: {
    contentType: 'application/json',
    Accept: 'application/json',
  },
})

export class Repository {
  private readonly schema: string

  constructor(protected readonly path?: string) {
    this.schema = ApiDomain.includes('http') ? '' : ApiDomain.includes('localhost') ? 'http://' : 'https://'
  }

  prepareConfigWithToken(accessToken: string) {
    return {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: false,
      params: {},
    }
  }

  apiGet(path?: string, config?: any) {
    return repository.get(`${this.schema}${ApiDomain}/${path || this.path}`, config)
  }

  apiPut(path?: string, payload?: any, config?: any) {
    return repository.put(`${this.schema}${ApiDomain}/${path || this.path}`, payload, config)
  }

  apiPost(path?: string, payload?: any, config?: any) {
    return repository.post(`${this.schema}${ApiDomain}/${path || this.path}`, payload, config)
  }

  apiDelete(path?: string, config?: any) {
    return repository.delete(`${this.schema}${ApiDomain}/${path || this.path}`, config)
  }
}
