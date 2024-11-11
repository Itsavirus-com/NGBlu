import { ApiCore } from './api-core'

export class BusinessPartnerContactApi extends ApiCore {
  async new(id: number, payload: Record<string, any>) {
    return await this.post({ path: `business-partners/${id}/contacts`, payload })
  }

  async update(id: number, contactId: number, payload: Record<string, any>) {
    return await this.put({ path: `business-partners/${id}/contacts/${contactId}`, payload })
  }
}

export const businessPartnerContactApi = new BusinessPartnerContactApi()
