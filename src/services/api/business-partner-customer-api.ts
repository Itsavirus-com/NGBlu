import { ApiCore } from './api-core'

export class BusinessPartnerCustomerApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `business-partners/${enterpriseRootId}/customers`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({
      path: `business-partners/${enterpriseRootId}/customers/${id}`,
      payload,
    })
  }
}

export const businessPartnerCustomerApi = new BusinessPartnerCustomerApi()
