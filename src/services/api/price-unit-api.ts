import { ApiCore } from './api-core'

export class PriceUnitApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/units', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/units/${id}`, payload })
  }
}

export const priceUnitApi = new PriceUnitApi()
