import { ApiCore } from './api-core'

export class ProductApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'products', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `products/${id}`, payload })
  }
}

export const productApi = new ProductApi()
