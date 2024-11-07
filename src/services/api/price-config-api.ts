import { ApiCore } from './api-core'

export class PriceConfigApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'prices/configs', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `prices/configs/${id}`, payload })
  }
}

export const priceConfigApi = new PriceConfigApi()
