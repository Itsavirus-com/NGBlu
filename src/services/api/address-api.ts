import { ApiCore } from './api-core'

export class AddressApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'addresses', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `addresses/${id}`, payload })
  }
}

export const addressApi = new AddressApi()
