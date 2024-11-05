import { ApiCore } from './api-core'

export class PriceTaxApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/taxes', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/taxes/${id}`, payload })
  }
}

export const priceTaxApi = new PriceTaxApi()
