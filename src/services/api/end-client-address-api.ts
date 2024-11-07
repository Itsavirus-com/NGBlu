import { ApiCore } from './api-core'

export class EndClientAddressApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `end-clients/${id}/addresses`, payload })
  }

  async update(id: number, addressId: number, payload: Record<string, any>) {
    return await this.put({ path: `end-clients/${id}/addresses/${addressId}`, payload })
  }
}

export const endClientAddressApi = new EndClientAddressApi()
