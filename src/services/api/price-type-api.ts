import { ApiCore } from './api-core'

export class PriceTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/types/${id}`, payload })
  }
}

export const priceTypeApi = new PriceTypeApi()
