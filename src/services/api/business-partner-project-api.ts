import { ApiCore } from './api-core'

export class BusinessPartnerProjectApi extends ApiCore {
  async new(enterpriseRootId: number, payload: Record<string, any>) {
    return await this.post({ path: `business-partners/${enterpriseRootId}/projects`, payload })
  }

  async update(enterpriseRootId: number, id: number, payload: Record<string, any>) {
    return await this.put({
      path: `business-partners/${enterpriseRootId}/projects/${id}`,
      payload,
    })
  }
}

export const businessPartnerProjectApi = new BusinessPartnerProjectApi()
