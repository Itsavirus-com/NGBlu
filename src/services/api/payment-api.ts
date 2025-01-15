import { ApiCore } from './api-core'

export class PaymentDetailApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'payments/details', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `payments/details/${id}`, payload })
  }

  async newBankPayment(payload: Record<string, any>) {
    return await this.post({ path: 'payments/details/bank', payload })
  }

  async updateBankPayment(id: number, payload: Record<string, any>) {
    return await this.put({ path: `payments/details/bank/${id}`, payload })
  }

  async newCreditCardPayment(payload: Record<string, any>) {
    return await this.post({ path: 'payments/details/credit-card', payload })
  }

  async updateCreditCardPayment(id: number, payload: Record<string, any>) {
    return await this.put({ path: `payments/details/credit-card/${id}`, payload })
  }
}

export const paymentDetailApi = new PaymentDetailApi()
