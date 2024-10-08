import { ApiCore } from './api-core'

export class AddressTypeApi extends ApiCore {
  async new(payload: Record<string, any>) {
    return await this.post({ path: 'addresses/types', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `addresses/types/${id}`, payload })
  }
}

export const addressTypeApi = new AddressTypeApi()
