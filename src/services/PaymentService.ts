import { BaseService } from '@/services/BaseService';
import { FindResultSet } from '@/types/find-result-set';
import { IPayment } from '@/types/models';

class PaymentService extends BaseService {
  async getPayment(accessToken: string, paymentId: number) {
    const result = await this.apiGet(`api/payments/${paymentId}`, accessToken);

    return result.data;
  }

  async getListPayment(accessToken: string, payload?: object): Promise<FindResultSet<IPayment>> {
    const result = await this.apiGet('api/payments', accessToken, payload);

    return result.data;
  }
  async updatePayment(accessToken: string, paymentId: number, payload?: object) {
    const result = await this.apiPut(`api/payments/${paymentId}`, accessToken, payload);

    return result.data;
  }

  async createPayment(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/payments`, accessToken, payload);

    return result.data;
  }

  // [START] role student
  async studentMeGetPayment(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IPayment>> {
    const result = await this.apiGet('api/student-me/payments', accessToken, payload);

    return result.data;
  }

  // [END] role student

  // [START] role teacher
  async teacherMeGetPayment(
    accessToken: string,
    payload?: object,
  ): Promise<FindResultSet<IPayment>> {
    const result = await this.apiGet('api/teacher-me/payments', accessToken, payload);

    return result.data;
  }

  // [END] role teacher
}

const paymentService = new PaymentService();
export default paymentService;
