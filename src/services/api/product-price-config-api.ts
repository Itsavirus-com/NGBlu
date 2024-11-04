import { ApiCore } from './api-core'

export class ProductPriceConfigApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'products/price-configs', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `products/price-configs/${id}`, payload })
  }
}

export const productPriceConfigApi = new ProductPriceConfigApi()
