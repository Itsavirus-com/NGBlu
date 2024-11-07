import { ApiCore } from './api-core'

export class PricePlanApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/plans', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/plans/${id}`, payload })
  }
}

export const pricePlanApi = new PricePlanApi()
