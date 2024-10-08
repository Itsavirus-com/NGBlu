import { ApiCore } from './api-core'

export class PaymentTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'payments/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `payments/types/${id}`, payload })
  }
}

export const paymentTypeApi = new PaymentTypeApi()
