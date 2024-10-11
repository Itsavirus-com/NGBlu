import { ApiCore } from './api-core'

export class ProductTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'products/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `products/types/${id}`, payload })
  }
}

export const productTypeApi = new ProductTypeApi()
