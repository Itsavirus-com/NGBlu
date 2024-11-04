import { ApiCore } from './api-core'

export class PaymentDetailApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'payments/details', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `payments/details/${id}`, payload })
  }
}

export const paymentDetailApi = new PaymentDetailApi()
