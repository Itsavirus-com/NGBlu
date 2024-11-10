import { ApiCore } from './api-core'

export class BusinessPartnerAddressApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `business-partners/${id}/addresses`, payload })
  }

  async update(id: number, addressId: number, payload: Record<string, any>) {
    return await this.put({ path: `business-partners/${id}/addresses/${addressId}`, payload })
  }
}

export const businessPartnerAddressApi = new BusinessPartnerAddressApi()
