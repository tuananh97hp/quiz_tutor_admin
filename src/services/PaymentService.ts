import { BaseService } from '@/services/BaseService';
import { FindResultSet } from '@/types/find-result-set';
import { IPayment } from '@/types/models';

class PaymentService extends BaseService {
  async getPayment(accessToken: string, paymentId: number) {
    const result = await this.apiGet(`api/workspaces/1/payments/${paymentId}`, accessToken);

    return result.data;
  }

  async getListPayment(accessToken: string, payload?: object): Promise<FindResultSet<IPayment>> {
    const result = await this.apiGet('api/workspaces/1/payments', accessToken, payload);

    return result.data;
  }
  async updatePayment(accessToken: string, paymentId: number, payload?: object) {
    const result = await this.apiPut(
      `api/workspaces/1/payments/${paymentId}`,
      accessToken,
      payload,
    );

    return result.data;
  }

  async createPayment(accessToken: string, payload?: object) {
    const result = await this.apiPost(`api/workspaces/1/payments`, accessToken, payload);

    return result.data;
  }
}

const paymentService = new PaymentService();
export default paymentService;
