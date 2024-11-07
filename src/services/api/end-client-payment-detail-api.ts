import { ApiCore } from './api-core'

export class EndClientPaymentDetailApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `end-clients/${id}/payment-details`, payload })
  }

  async update(id: number, paymentDetailId: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/${id}/payment-details/${paymentDetailId}`, payload })
  }
}

export const endClientPaymentDetailApi = new EndClientPaymentDetailApi()
