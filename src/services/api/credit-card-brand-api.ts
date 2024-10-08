import { ApiCore } from './api-core'

export class CreditCardBrandApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'credit-cards/brands', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `credit-cards/brands/${id}`, payload })
  }
}

export const creditCardBrandApi = new CreditCardBrandApi()
