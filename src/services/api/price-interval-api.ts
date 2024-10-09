import { ApiCore } from './api-core'

export class PriceIntervalApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/intervals', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/intervals/${id}`, payload })
  }
}

export const priceIntervalApi = new PriceIntervalApi()
