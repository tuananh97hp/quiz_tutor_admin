import { Repository } from '@/repositories/Repository'
import { IResultApiData } from '@/types'

export class PaymentRepository extends Repository {
  getPayment(accessToken: string, paymentId: number): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiGet(`api/payments/${paymentId}`, config)
  }

  getListPayment(accessToken: string, payload?: object): Promise<IResultApiData> {
    let config = this.prepareConfigWithToken(accessToken)
    config = { ...config, params: payload || {} }

    return this.apiGet('api/payments', config)
  }
  createStudentPayment(accessToken: string, payload?: object): Promise<IResultApiData> {
    const config = this.prepareConfigWithToken(accessToken)

    return this.apiPost(`api/payments`, payload, config)
  }
}
