import { BaseService } from '@/services/BaseService';

export class PaymentService extends BaseService {
  getPayment(accessToken: string, paymentId: number) {
    return this.apiGet(`api/payments/${paymentId}`, accessToken);
  }

  getListPayment(accessToken: string, payload?: object) {
    return this.apiGet('api/payments', accessToken, payload);
  }
  createStudentPayment(accessToken: string, payload?: object) {
    return this.apiPost(`api/payments`, accessToken, payload);
  }
}
