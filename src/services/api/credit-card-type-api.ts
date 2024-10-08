import { ApiCore } from './api-core'

export class CreditCardTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'credit-cards/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `credit-cards/types/${id}`, payload })
  }
}

export const creditCardTypeApi = new CreditCardTypeApi()
