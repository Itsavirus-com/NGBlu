import { ApiCore } from './api-core'

export class BusinessPartnerUserApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `business-partners/${enterpriseRootId}/users`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({
      path: `business-partners/${enterpriseRootId}/users/${id}`,
      payload,
    })
  }
}

export const businessPartnerUserApi = new BusinessPartnerUserApi()
